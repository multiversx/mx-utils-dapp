import type { SetStateAction, Dispatch } from 'react';
import type { MetricType } from 'pages/Authentication/types';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export interface FormValuesType {
  token: string;
}

export interface InputPropsType {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  chain: EnvironmentsEnum;
}
