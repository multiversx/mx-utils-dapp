import type { Dispatch, SetStateAction } from 'react';
import type { FormikProps } from 'formik';
import type { MetricType } from 'pages/Authentication/types';
import type { FormValuesType } from '../../types';

export interface TextareaPropsType extends FormikProps<FormValuesType> {
  setMetrics: Dispatch<SetStateAction<MetricType>>;
}

export interface TextareaDivisionType {
  color: string;
  text: string;
}
