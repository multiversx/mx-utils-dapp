import { Formik } from 'formik';
import { object, string } from 'yup';

import styles from 'pages/SignMessage/styles.module.scss';

import { SignMessageForm } from './components/SignMessageForm';
import { useSignMessageSectionActions } from './hooks/useSignMessageSectionActions';

export const SignMessageSection = () => {
  const { handleSignMessage } = useSignMessageSectionActions();

  const initialValues = { message: '' };
  const schema = string().required('Required');
  const validationSchema = object().shape({
    message: schema
  });

  const formikProps = {
    initialValues,
    onSubmit: handleSignMessage,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Paste in the message you would like to sign
      </h3>

      <Formik {...formikProps}>
        <SignMessageForm />
      </Formik>
    </div>
  );
};
