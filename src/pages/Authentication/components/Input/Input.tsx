import { Formik } from 'formik';
import { InputForm } from './InputForm';

export const Input = () => {
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{ token: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      initialErrors={{ token: 'Missing Token' }}
    >
      <InputForm />
    </Formik>
  );
};
