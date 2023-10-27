import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useFormikContext } from 'formik';
import { emptyMetrics } from 'pages/Authentication/constants/metrics.contants';
import { useAuthenticationContext } from 'pages/Authentication/context';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { useChain } from 'hooks/useChain';
import { decodeToken } from '../components/Textarea/helpers/decodeToken';
import { validateToken } from '../components/Textarea/helpers/validateToken';
import { FormValuesType } from '../types';
import { MetricType } from '../../../types';
import debounce from 'lodash.debounce';
import { UndoRedoCache } from 'helpers/undoRedoCache';

const cache = UndoRedoCache();

// const cache = {
//   _cache: [] as string[],
//   position: 0,
//
//   append: function (value: string) {
//     if (this._cache.length >= CACHE_LIMIT) {
//       this._cache = this._cache.slice(1);
//     }
//
//     this._cache.push(value);
//     this.position++;
//   },
//   undo: function () {
//     if (this._cache[this.position - 1]) {
//       this.position--;
//       return this._cache[this.position];
//     }
//   },
//   redo: function () {
//     if (this._cache[this.position + 1]) {
//       this.position++;
//       return this._cache[this.position];
//     }
//   }
// };

export const useTokenActions = () => {
  const { setMetrics } = useAuthenticationContext();
  const { chain } = useChain();
  const mirrorRef = useRef<HTMLDivElement>(null);
  const currentInputRef = useRef<string | null>();

  const { setFieldValue, setFieldTouched, setFieldError, values } =
    useFormikContext<FormValuesType>();

  // const handleInput = useCallback((event: FormEvent<HTMLFormElement>) => {
  // const padding = parseInt(getComputedStyle(event.currentTarget).fontSize);
  // const style = event.currentTarget.style;
  //
  // Object.assign(style, { height: '1px' });
  // Object.assign(style, {
  //   height: `${event.currentTarget.scrollHeight - padding * 2}px`
  // });
  // }, []);

  const decodeAndValidateToken = useCallback(
    async (token: string) => {
      try {
        const config = {
          apiUrl: fallbackNetworkConfigurations[chain].apiAddress
        };

        const promises = [
          decodeToken(token, config),
          validateToken(token, config)
        ];

        const [decoded, valid] = await Promise.allSettled(promises);

        const tokenExpired =
          valid.status === 'rejected' &&
          valid.reason.message === 'Token expired';

        if (decoded.status === 'rejected') {
          setFieldError('token', 'Token Undecodable');
          setFieldError(
            'message',
            'The provided token is not a NativeAuth token.'
          );
          setMetrics(emptyMetrics);
          return;
        } else if (decoded.value) {
          setMetrics(decoded.value as MetricType);
        }

        if (tokenExpired) {
          setFieldError('token', 'Token Expired');
          setFieldError('message', undefined);
          return;
        }

        if (valid.status === 'rejected') {
          setFieldError('token', 'Token Invalid');
          setFieldError('message', "Signature doesn't match.");
          return;
        }

        setFieldError('token', undefined);
        setFieldError('message', undefined);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setMetrics(emptyMetrics);
        }
      }
    },
    [chain, setFieldError, setMetrics]
  );

  const debouncedDecodeAndValidateToken = useMemo(
    () => debounce(decodeAndValidateToken, 500),
    [decodeAndValidateToken]
  );

  const moveCursorToEnd = useCallback(() => {
    const range = document.createRange();
    const selection = window.getSelection();

    if (!mirrorRef.current || !selection || !range) {
      return;
    }

    range.setStart(mirrorRef.current, mirrorRef.current.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    mirrorRef.current.focus();
  }, []);

  const handleChange = useCallback(
    async (
      event: ChangeEvent<HTMLFormElement> | string,
      onAfterContentChange?: (value: string) => void
    ) => {
      const token = typeof event === 'string' ? event : event.target.value;
      console.log('handleChange - token', token);

      setFieldValue('token', token, false);
      setFieldTouched('token', true, false);

      if (!token) {
        setFieldError('token', 'Token Undecodable');
        setFieldError(
          'message',
          'The provided token is not a NativeAuth token.'
        );
        setMetrics(emptyMetrics);
        return;
      }

      moveCursorToEnd();
      await debouncedDecodeAndValidateToken(token);
    },
    [
      setFieldValue,
      setFieldTouched,
      debouncedDecodeAndValidateToken,
      setFieldError,
      setMetrics,
      moveCursorToEnd
    ]
  );

  const handlePreventDefault = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      console.log('onInput', (e.target as HTMLDivElement).textContent);
      const textContent = (e.target as HTMLDivElement).textContent;

      if (!textContent) {
        return;
      }

      cache.append(textContent);
      handleChange(textContent, moveCursorToEnd);
    },
    [handleChange, moveCursorToEnd]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      let textContent = null;

      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'z') {
        e.preventDefault();
        e.stopPropagation();
        textContent = cache.undo();

        if (!textContent) {
          return;
        }

        handleChange(textContent, moveCursorToEnd);
      } else if (ctrl && e.key === 'y') {
        e.preventDefault();
        e.stopPropagation();
        textContent = cache.redo();

        if (!textContent) {
          return;
        }

        handleChange(textContent, moveCursorToEnd);
      }
    },
    [handleChange, moveCursorToEnd]
  );

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     const commonKey = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
  //     const allowedCombinationKeys = ['a', 'c', 'v', 'x'];
  //     const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  //
  //     const allowedCombinations =
  //       commonKey && allowedCombinationKeys.includes(e.key);
  //     const allowed =
  //       commonKey || arrowKeys.includes(e.key) || allowedCombinations;
  //
  //     if (!allowed) {
  //       handlePreventDefault(e);
  //     }
  //   },
  //   [handlePreventDefault]
  // );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      handlePreventDefault(e);

      const token = e.nativeEvent?.clipboardData?.getData('text');
      if (!token) {
        return;
      }

      cache.append(token);
      handleChange(token);
    },
    [handleChange, handlePreventDefault]
  );

  // useEffect(() => {
  //   const token = values.token;
  //   handleChange(token);
  // }, []);

  return {
    handleInput,
    handleChange,
    handleKeyDown,
    handlePaste,
    handlePreventDefault,
    mirrorRef,
    moveCursorToEnd,
    cache
  };
};
