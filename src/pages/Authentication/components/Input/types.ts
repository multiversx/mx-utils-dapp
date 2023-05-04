import type { SetStateAction, Dispatch } from 'react';
import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

import type { MetricType } from 'pages/Authentication/types';

export interface FormValuesType {
  token: string;
  message?: string;
}

export interface InputPropsType {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
  setChain: Dispatch<SetStateAction<EnvironmentsEnum>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  chain: EnvironmentsEnum;
}
