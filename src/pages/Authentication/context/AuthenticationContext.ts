import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { MetricItemType, MetricType } from '../types';
import { useChain } from 'hooks/useChain';
import { TokenColorsEnum } from '../enum';
import { DEFAULT_METRICS } from '../constants';
import axios from 'axios';
import { miscApi } from 'config';

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
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }

  return context;
};

export const useAuthenticationValue = () => {
  const { chain } = useChain();
  const [metrics, setMetrics] = useState<MetricType>(DEFAULT_METRICS[chain]);
  const [initialTokens, setInitialTokens] = useState<InitialTokensType>();
  const [fetchingInitialTokens, setFetchingInitialTokens] = useState<boolean>();
  const [isValidating, setIsValidating] = useState<boolean>();

  const metricItems: MetricItemType[] = useMemo(
    () => [
      {
        name: 'Address',
        identifier: 'address',
        colors: [TokenColorsEnum.address],
        data: metrics ? metrics.address : undefined
      },
      {
        name: 'Body',
        identifier: 'body',
        colors: [
          TokenColorsEnum.host,
          TokenColorsEnum.blockHash,
          TokenColorsEnum.ttl,
          TokenColorsEnum.extra
        ],
        data: metrics ? metrics.body : undefined
      },
      {
        name: 'Host',
        identifier: 'host',
        colors: [TokenColorsEnum.host],
        data: metrics ? metrics.host : undefined,
        subItem: true
      },
      {
        name: 'Block Hash',
        identifier: 'blockHash',
        colors: [TokenColorsEnum.blockHash],
        data: metrics ? metrics.blockHash : undefined,
        explorer: metrics ? `/blocks/${metrics.blockHash}` : '',
        subItem: true
      },

      {
        name: 'Time to live (seconds)',
        identifier: 'ttl',
        colors: [TokenColorsEnum.ttl],
        data: metrics ? metrics.ttl : undefined,
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
        data: metrics ? metrics.signature : undefined
      }
    ],
    [metrics]
  );

  const fetchInitialTokens = async () => {
    setFetchingInitialTokens(true);
    try {
      const { data } = await axios.get<InitialTokensType>(
        `${miscApi}/utils-native-auth`
      );

      setInitialTokens(data);
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
    setIsValidating
  };
};
