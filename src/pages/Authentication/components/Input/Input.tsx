import { Formik } from 'formik';
import { useChain } from 'hooks/useChain';
import { InputForm } from './InputForm';
import { useAuthenticationContext } from '../../context';

export const Input = () => {
  const { initialTokens } = useAuthenticationContext();
  const { chain } = useChain();

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{ token: initialTokens?.[chain] ?? '' }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
    >
      <InputForm />
    </Formik>
  );
};
