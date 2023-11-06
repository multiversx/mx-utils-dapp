import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { miscApi } from 'config';
import { TokenColorsEnum } from '../enum';
import { MetricItemType, MetricType } from '../types';

export type InitialTokensType = {
  mainnet: string;
  devnet: string;
  testnet: string;
};

export type AuthenticationContextType = {
  metrics: MetricType;
  setMetrics: Dispatch<SetStateAction<MetricType>>;
  metricItems: MetricItemType[];
  initialTokens?: InitialTokensType;
  fetchingInitialTokens?: boolean;
  isValidating?: boolean;
  setIsValidating: Dispatch<SetStateAction<boolean | undefined>>;
};

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (context === null) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider',
    );
  }

  return context;
};

export const useAuthenticationValue = () => {
  const [metrics, setMetrics] = useState<MetricType>();
  const [initialTokens, setInitialTokens] = useState<InitialTokensType>();
  const [fetchingInitialTokens, setFetchingInitialTokens] = useState<boolean>();
  const [isValidating, setIsValidating] = useState<boolean>();

  const metricItems: MetricItemType[] = useMemo(
    () => [
      {
        name: 'Address',
        identifier: 'address',
        colors: [TokenColorsEnum.address],
        data: metrics?.address,
      },
      {
        name: 'Body',
        identifier: 'body',
        colors: [
          TokenColorsEnum.origin,
          TokenColorsEnum.blockHash,
          TokenColorsEnum.ttl,
          TokenColorsEnum.extra,
        ],
        data: metrics?.body,
      },
      {
        name: 'Origin',
        identifier: 'origin',
        colors: [TokenColorsEnum.origin],
        data: metrics?.origin,
        subItem: true,
      },
      {
        name: 'Block Hash',
        identifier: 'blockHash',
        colors: [TokenColorsEnum.blockHash],
        data: metrics?.blockHash,
        explorer: metrics ? `/blocks/${metrics.blockHash}` : '',
        subItem: true,
      },

      {
        name: 'Time to live (seconds)',
        identifier: 'ttl',
        colors: [TokenColorsEnum.ttl],
        data: metrics?.ttl,
        subItem: true,
      },
      {
        name: 'Extra Info',
        identifier: 'extraInfo',
        colors: [TokenColorsEnum.extra],
        subItem: true,
        data:
          metrics && Object.keys(metrics.extraInfo || []).length > 0
            ? JSON.stringify(metrics.extraInfo, null, 2)
            : undefined,
      },
      {
        name: 'Signature',
        identifier: 'signature',
        colors: [TokenColorsEnum.signature],
        data: metrics?.signature,
      },
    ],
    [metrics],
  );

  const fetchInitialTokens = async () => {
    setFetchingInitialTokens(true);
    try {
      const { data } = await axios.get<InitialTokensType>(
        `${miscApi}/utils-native-auth`,
      );

      setInitialTokens(data);
      setFetchingInitialTokens(false);
    } catch (err) {
      console.error(err);
      setFetchingInitialTokens(false);
    }
  };

  useEffect(() => {
    fetchInitialTokens();
  }, []);

  return {
    metrics,
    setMetrics,
    metricItems,
    initialTokens,
    fetchingInitialTokens,
    isValidating,
    setIsValidating,
  };
};
