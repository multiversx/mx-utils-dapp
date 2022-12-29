import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { Field } from 'formik';
import {
  useGetIsLoggedIn,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks/account/useGetLoginInfo';
import { logout } from '@elrondnetwork/dapp-core/utils/logout';
import classNames from 'classnames';
import moment from 'moment';

import { ThemeEnumType } from 'helpers/enum';
import { useTheme } from 'helpers/useTheme';
import { storage } from 'helpers/storage';

import {
  TokenColorsEnum,
  TokenDefaultColorsEnum
} from 'pages/Authentication/enum';
import { emptyMetrics } from 'pages/Authentication';

import { decodeToken } from './helpers/decodeToken';
import { validateToken } from './helpers/validateToken';

import type { TextareaDivisionType, TextareaPropsType } from './types';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Textarea = (props: TextareaPropsType) => {
  const { theme } = useTheme();
  const { tokenLogin, loginMethod } = useGetLoginInfo();
  const { values, setMetrics, setFieldValue, setFieldTouched, setFieldError } =
    props;

  const { network } = useGetNetworkConfig();

  const nativeAuthToken = storage.getLocalItem('nativeAuthToken');
  const clone = useRef<HTMLDivElement>(null);
  const isLoggedIn = useGetIsLoggedIn();

  const defaultColor =
    theme === ThemeEnumType.dark
      ? TokenDefaultColorsEnum.lightDefault
      : TokenDefaultColorsEnum.darkDefault;

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
        return;
      }

      try {
        const config = {
          apiUrl: network.apiAddress
        };

        const promises = [decodeToken(token), validateToken(token, config)];
        const [decoded, valid] = await Promise.allSettled(promises);
        const decodedValue = decoded as any;

        if (decoded.status === 'rejected') {
          setFieldError('token', 'Token Undecodable');
          setMetrics(emptyMetrics);
          return;
        } else {
          setMetrics(decodedValue.value);
        }

        if (valid.status === 'rejected') {
          setFieldError('token', 'Token Invalid');
          return;
        }

        setFieldError('token', '');
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setMetrics(emptyMetrics);
        }
      }
    },
    [
      setFieldError,
      setFieldValue,
      network.apiAddress,
      setFieldTouched,
      setMetrics
    ]
  );

  useEffect(() => {
    if (nativeAuthToken) {
      setFieldValue('token', nativeAuthToken, true);
      storage.removeLocalItem('nativeAuthToken');
      onChange(nativeAuthToken);
    }
  }, [setFieldValue, onChange, nativeAuthToken]);

  useEffect(() => {
    if (isLoggedIn && tokenLogin && tokenLogin.nativeAuthToken) {
      const token = tokenLogin.nativeAuthToken;
      const route = `${window.location.origin}/auth`;
      const isWallet = loginMethod === 'wallet';
      const redirect = isWallet ? encodeURIComponent(route) : route;

      if (!nativeAuthToken) {
        logout(redirect);
        storage.setLocalItem({
          data: token,
          key: 'nativeAuthToken',
          expires: moment().add(1, 'minute').unix()
        });
      }
    }
  }, [isLoggedIn, nativeAuthToken, loginMethod, tokenLogin]);

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
