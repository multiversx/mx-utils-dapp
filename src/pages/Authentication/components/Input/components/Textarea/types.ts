import type { FormikProps } from 'formik';
import { MetricType } from 'pages/Authentication/types';
import { Dispatch, SetStateAction } from 'react';
import type { FormValuesType } from '../../types';

export interface TextareaPropsType extends FormikProps<FormValuesType> {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
}

export interface TextareaDivisionType {
  color: string;
  text: string;
}
