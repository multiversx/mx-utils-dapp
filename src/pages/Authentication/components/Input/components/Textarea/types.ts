import type { FormikProps } from 'formik';
import type { FormValuesType } from '../../types';

export interface TextareaPropsType extends FormikProps<FormValuesType> {
  colors: string[];
}

export interface TextareaDivisionType {
  color: string;
  text: string;
}
