import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import axios from 'axios';
import { miscApi } from 'config';
import { useChain } from 'hooks/useChain';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { EnvironmentsEnum } from 'lib';
import { GENERATED_TOKEN_CHAIN } from 'localConstants';

import { TokenColorsEnum } from '../enum';
import { MetricItemType, MetricType } from '../types';

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export type AuthenticationContextType = {
  metrics: MetricType;
  setMetrics: Dispatch<SetStateAction<MetricType>>;
  metricItems: MetricItemType[];
  initialTokens?: InitialTokensType;
  fetchingInitialTokens?: boolean;
  isValidating?: boolean;
  setIsValidating: Dispatch<SetStateAction<boolean | undefined>>;
};

export type InitialTokensType = {
  mainnet: string;
  devnet: string;
  testnet: string;
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (context === null) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }

  return context;
};

export const useAuthenticationValue = () => {
  const { chain } = useChain();
  const [metrics, setMetrics] = useState<MetricType>();
  const [initialTokens, setInitialTokens] = useState<InitialTokensType>();
  const [fetchingInitialTokens, setFetchingInitialTokens] = useState<boolean>();
  const [isValidating, setIsValidating] = useState<boolean>();

  const nativeAuthToken = useGetNativeAuthToken();

  const metricItems: MetricItemType[] = useMemo(
    () => [
      {
        name: 'Address',
        identifier: 'address',
        colors: [TokenColorsEnum.address],
        data: metrics?.address
      },
      {
        name: 'Body',
        identifier: 'body',
        colors: [
          TokenColorsEnum.origin,
          TokenColorsEnum.blockHash,
          TokenColorsEnum.ttl,
          TokenColorsEnum.extra
        ],
        data: metrics?.body
      },
      {
        name: 'Origin',
        identifier: 'origin',
        colors: [TokenColorsEnum.origin],
        data: metrics?.origin,
        subItem: true
      },
      {
        name: 'Block Hash',
        identifier: 'blockHash',
        colors: [TokenColorsEnum.blockHash],
        data: metrics?.blockHash,
        explorer: metrics ? `/blocks/${metrics.blockHash}` : '',
        subItem: true
      },

      {
        name: 'Time to live (seconds)',
        identifier: 'ttl',
        colors: [TokenColorsEnum.ttl],
        data: metrics?.ttl,
        subItem: true
      },
      {
        name: 'Extra Info',
        identifier: 'extraInfo',
        colors: [TokenColorsEnum.extra],
        subItem: true,
        data:
          metrics && Object.keys(metrics.extraInfo || []).length > 0
            ? JSON.stringify(metrics.extraInfo, null, 2)
            : undefined
      },
      {
        name: 'Signature',
        identifier: 'signature',
        colors: [TokenColorsEnum.signature],
        data: metrics?.signature
      }
    ],
    [metrics]
  );

  const fetchInitialTokens = useCallback(async () => {
    setFetchingInitialTokens(true);
    try {
      const { data } = await axios.get<InitialTokensType>(
        `${miscApi}/utils-native-auth`
      );

      if (nativeAuthToken) {
        const generatedTokenChain = sessionStorage.getItem(
          GENERATED_TOKEN_CHAIN
        ) as EnvironmentsEnum | null;
        data[generatedTokenChain ?? chain] = nativeAuthToken;
      }

      setInitialTokens(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingInitialTokens(false);
    }
  }, [chain, nativeAuthToken]);

  useEffect(() => {
    fetchInitialTokens();
  }, [nativeAuthToken]);

  return {
    metrics,
    setMetrics,
    metricItems,
    initialTokens,
    fetchingInitialTokens,
    isValidating,
    setIsValidating
  };
};
