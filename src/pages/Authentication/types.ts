import type { ReactNode } from 'react';
import type { NativeAuthDecoded } from '@elrondnetwork/native-auth-server/lib/src/entities/native.auth.decoded';
import type { TokenColorsEnum } from './enum';

export type MetricType = NativeAuthDecoded | undefined;

export interface MetricItemType {
  name: string;
  color: TokenColorsEnum;
  data: ReactNode;
}
