import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { emptyMetrics } from 'pages/Authentication/constants/metrics.contants';
import { useAuthenticationContext } from 'pages/Authentication/context';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { useChain } from 'hooks/useChain';
import { decodeToken } from '../components/Textarea/helpers/decodeToken';
import { validateToken } from '../components/Textarea/helpers/validateToken';
import { FormValuesType } from '../types';
import { MetricType } from 'pages/Authentication/types';
import debounce from 'lodash.debounce';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn';

const TOKEN_REGEX = /\w+[\w.]+\w/g;

export const useTokenActions = () => {
  const { setMetrics, initialTokens, setIsValidating } =
    useAuthenticationContext();
  const { chain } = useChain();
  const isLoggedIn = useGetIsLoggedIn();

  const { setFieldValue, setFieldTouched, setFieldError } =
    useFormikContext<FormValuesType>();

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

        setIsValidating(true);
        const [decoded, valid] = await Promise.allSettled(promises);
        setIsValidating(false);

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

        setIsValidating(false);
      }
    },
    [chain, setFieldError, setIsValidating, setMetrics]
  );

  const debouncedDecodeAndValidateToken = useMemo(
    () => debounce(decodeAndValidateToken, 200),
    [decodeAndValidateToken]
  );

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLTextAreaElement> | string) => {
      const token = typeof event === 'string' ? event : event.target.value;

      setFieldValue('token', token, false);
      setFieldTouched('token', true, false);

      const hasUnrelatedTokenCharacters =
        token.replace(TOKEN_REGEX, '').length > 0;

      if (!token || hasUnrelatedTokenCharacters) {
        setFieldError('token', 'Token Undecodable');
        setFieldError(
          'message',
          'The provided token is not a NativeAuth token.'
        );
        setMetrics(emptyMetrics);
        return;
      }

      await debouncedDecodeAndValidateToken(token);
    },
    [
      setFieldValue,
      setFieldTouched,
      debouncedDecodeAndValidateToken,
      setFieldError,
      setMetrics
    ]
  );

  const handlePreventDefault = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
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

  useEffect(() => {
    if (!initialTokens || isLoggedIn) return;

    handleChange(initialTokens[chain]);
  }, [chain, handleChange, initialTokens, isLoggedIn]);

  return {
    handleChange,
    handlePaste,
    handlePreventDefault
  };
};