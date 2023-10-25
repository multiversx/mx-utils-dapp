import type { Dispatch, SetStateAction } from 'react';
import type { MetricType } from 'pages/Authentication/types';

export interface TextareaPropsType {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
}

export interface TextareaDivisionType {
  color: string;
  text: string;
}
