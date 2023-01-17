import type { ReactNode } from 'react';
import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import type { NativeAuthDecoded } from '@multiversx/sdk-native-auth-server/lib/src/entities/native.auth.decoded';
import type { TokenColorsEnum } from './enum';

export type MetricType = NativeAuthDecoded | undefined;

export interface DefaultMetricType {
  [key: string]: MetricType;
  [EnvironmentsEnum.mainnet]: MetricType;
  [EnvironmentsEnum.devnet]: MetricType;
  [EnvironmentsEnum.testnet]: MetricType;
}

export interface MetricItemType {
  name: string;
  colors: TokenColorsEnum[];
  chain?: EnvironmentsEnum;
  data?: ReactNode;
  explorer?: string;
  identifier: string;
  subItem?: boolean;
}
