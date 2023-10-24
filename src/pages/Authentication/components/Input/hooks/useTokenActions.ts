import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useFormikContext } from 'formik';
import { emptyMetrics } from 'pages/Authentication/constants/metrics.contants';
import { useAuthenticationContext } from 'pages/Authentication/context';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { useChain } from 'hooks/useChain';
import { decodeToken } from '../components/Textarea/helpers/decodeToken';
import { validateToken } from '../components/Textarea/helpers/validateToken';
import { FormValuesType } from '../types';

export const useTokenActions = () => {
  const { setMetrics } = useAuthenticationContext();
  const { chain } = useChain();

  const { setFieldValue, setFieldTouched, setFieldError } =
    useFormikContext<FormValuesType>();

  const handleInput = useCallback((event: FormEvent<HTMLFormElement>) => {
    const padding = parseInt(getComputedStyle(event.currentTarget).fontSize);
    const style = event.currentTarget.style;

    Object.assign(style, { height: '1px' });
    Object.assign(style, {
      height: `${event.currentTarget.scrollHeight - padding * 2}px`
    });
  }, []);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLFormElement> | string) => {
      const token = typeof event === 'string' ? event : event.target.value;

      setFieldValue('token', token, false);
      setFieldTouched('token', true, false);

      if (!Boolean(token)) {
        setFieldError('token', 'Token Undecodable');
        setFieldError(
          'message',
          'The provided token is not a NativeAuth token.'
        );
        setMetrics(emptyMetrics);
        return;
      }

      try {
        const config = {
          apiUrl: fallbackNetworkConfigurations[chain].apiAddress
        };

        const promises = [
          decodeToken(token, config),
          validateToken(token, config)
        ];

        const [decoded, valid] = await Promise.allSettled(promises);

        const decodedValue = decoded as any;
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
        } else {
          setMetrics(decodedValue.value);
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
    [setFieldError, chain, setFieldValue, setFieldTouched, setMetrics]
  );

  const handlePreventDefault = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const commonKey = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
      const allowedCombinationKeys = ['a', 'c', 'v', 'x'];
      const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

      const allowedCombinations =
        commonKey && allowedCombinationKeys.includes(e.key);
      const allowed =
        commonKey || arrowKeys.includes(e.key) || allowedCombinations;

      if (!allowed) {
        handlePreventDefault(e);
      }
    },
    [handlePreventDefault]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      handlePreventDefault(e);

      const token = e.nativeEvent?.clipboardData?.getData('text');
      if (!token) {
        return;
      }
      handleChange(token);
    },
    [handleChange, handlePreventDefault]
  );

  return {
    handleInput,
    handleChange,
    handleKeyDown,
    handlePaste,
    handlePreventDefault
  };
};
