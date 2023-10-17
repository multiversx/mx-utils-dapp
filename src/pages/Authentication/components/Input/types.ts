import type { SetStateAction, Dispatch } from 'react';

import type { MetricType } from 'pages/Authentication/types';

export interface FormValuesType {
  token: string;
  message?: string;
}

export interface InputPropsType {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
}
