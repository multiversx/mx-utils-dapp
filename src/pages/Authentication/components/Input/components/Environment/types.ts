import type { Dispatch, SetStateAction } from 'react';
import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

import type { MetricType } from 'pages/Authentication/types';

export interface EnvironmentPropsType {
  chain: EnvironmentsEnum;
  setChain: Dispatch<SetStateAction<EnvironmentsEnum>>;
  setMetrics: Dispatch<SetStateAction<MetricType>>;
}

export interface OptionType {
  value: EnvironmentsEnum;
  label: EnvironmentsEnum;
}
