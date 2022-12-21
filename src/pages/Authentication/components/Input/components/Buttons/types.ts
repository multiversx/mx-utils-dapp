import type { FormikProps } from 'formik';
import type { FormValuesType } from '../../types';

export interface ButtonsPropsType extends FormikProps<FormValuesType> {
  onReset: () => void;
}
