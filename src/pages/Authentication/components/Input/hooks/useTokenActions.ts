import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo } from 'react';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { NativeAuthServerConfig } from '@multiversx/sdk-native-auth-server/lib/src/entities/native.auth.server.config';
import { useFormikContext } from 'formik';
import debounce from 'lodash.debounce';
import { useChain } from 'hooks/useChain';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { EXPIRY_SECONDS } from 'localConstants/nativeAuth';
import { emptyMetrics } from 'pages/Authentication/constants/metrics.contants';
import { useAuthenticationContext } from 'pages/Authentication/context';
import { MetricType } from 'pages/Authentication/types';
import { decodeToken } from '../components/Textarea/helpers/decodeToken';
import { validateToken } from '../components/Textarea/helpers/validateToken';
import { verifySignature } from '../components/Textarea/helpers/verifySignature';
import { FormValuesType } from '../types';

const TOKEN_REGEX = /\w+[\w.]+\w/g;

export const useTokenActions = () => {
  const { setMetrics, initialTokens, setIsValidating } =
    useAuthenticationContext();
  const { chain } = useChain();
  const nativeAuthToken = useGetNativeAuthToken();

  const { setFieldValue, setFieldTouched, setFieldError } =
    useFormikContext<FormValuesType>();

  const decodeAndValidateToken = useCallback(
    async (token: string) => {
      try {
        const config: NativeAuthServerConfig = {
          apiUrl: fallbackNetworkConfigurations[chain].apiAddress,
          acceptedOrigins: [window.location.origin],
          maxExpirySeconds: EXPIRY_SECONDS,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          isOriginAccepted: (_origin) => {
            return true;
          },
          verifySignature,
        };

        const promises = [
          decodeToken(token, config),
          validateToken(token, config),
        ];

        setIsValidating(true);
        const [decoded, valid] = await Promise.allSettled(promises);
        setIsValidating(false);

        if (decoded.status === 'rejected') {
          setFieldError('token', 'Token Undecodable');
          setFieldError(
            'message',
            'The provided token is not a NativeAuth token.',
          );
          setMetrics(emptyMetrics);
          return;
        } else if (decoded.value) {
          setMetrics(decoded.value as MetricType);
        }

        if (valid.status === 'rejected') {
          setFieldError('token', valid.reason.message ?? 'Token Invalid');
          setFieldError('message', undefined);
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
    [chain, setFieldError, setIsValidating, setMetrics],
  );

  const debouncedDecodeAndValidateToken = useMemo(
    () => debounce(decodeAndValidateToken, 200),
    [decodeAndValidateToken],
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
          'The provided token is not a NativeAuth token.',
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
      setMetrics,
    ],
  );

  const handlePreventDefault = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
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
    [handleChange, handlePreventDefault],
  );

  useEffect(() => {
    if (!initialTokens) return;

    handleChange(initialTokens[chain]);
  }, [chain, handleChange, initialTokens]);

  useEffect(() => {
    if (!nativeAuthToken) return;

    handleChange(nativeAuthToken);
  }, [chain, handleChange, nativeAuthToken]);

  return {
    handleChange,
    handlePaste,
    handlePreventDefault,
  };
};
