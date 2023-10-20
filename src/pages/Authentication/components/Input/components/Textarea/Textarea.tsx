import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { Field } from 'formik';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import classNames from 'classnames';
import { TokenColorsEnum } from 'pages/Authentication/enum';
import { emptyMetrics } from 'pages/Authentication';
import { decodeToken } from './helpers/decodeToken';
import { validateToken } from './helpers/validateToken';
import type { TextareaDivisionType, TextareaPropsType } from './types';
import styles from './styles.module.scss';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { useChain } from 'hooks/useChain';

/*
 * Handle the component declaration.
 */

export const Textarea = (props: TextareaPropsType) => {
  const nativeAuthToken = useGetNativeAuthToken();
  const { values, setMetrics, setFieldValue, setFieldTouched, setFieldError } =
    props;

  const { chain } = useChain();
  const clone = useRef<HTMLDivElement>(null);

  const defaultColor = '#000000';

  const mirror = useMemo(() => {
    const parts = values.token.split('.');
    const colors = Object.values(TokenColorsEnum);

    const words = parts.reduce(
      (total: TextareaDivisionType[], word: string, index: number) => {
        const part: TextareaDivisionType = {
          color: colors[index] ? colors[index] : defaultColor,
          text: word
        };

        const dot: TextareaDivisionType = {
          color: defaultColor,
          text: '.'
        };

        if (parts.length - 1 === index) {
          return total.concat([part]);
        }

        return total.concat([part, dot]);
      },
      []
    );

    return words;
  }, [values.token, defaultColor]);

  const onInput = useCallback((event: FormEvent<HTMLFormElement>) => {
    const padding = parseInt(getComputedStyle(event.currentTarget).fontSize);
    const style = event.currentTarget.style;

    Object.assign(style, { height: '1px' });
    Object.assign(style, {
      height: `${event.currentTarget.scrollHeight - padding * 2}px`
    });
  }, []);

  const onChange = useCallback(
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

  useEffect(() => {
    const token = nativeAuthToken;

    if (token) {
      setFieldValue('token', nativeAuthToken, false);
      onChange(token);
    }
  }, [setFieldValue, onChange, nativeAuthToken]);

  /*
   * Return the rendered component.
   */

  return (
    <div className={styles.textarea}>
      <Field
        component='textarea'
        name='token'
        onInput={onInput}
        onChange={onChange}
        className={classNames(styles.field, {
          [styles.large]: Boolean(nativeAuthToken)
        })}
      />

      <div className={styles.clone}>
        <div className={styles.mirror} ref={clone}>
          {mirror.map((word: any, index: any) => (
            <span
              style={{ color: word.color }}
              className={styles.word}
              key={`word-${word.text}-${index}`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
