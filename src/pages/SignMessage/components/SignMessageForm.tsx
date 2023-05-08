import { ChangeEvent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { object, string } from 'yup';
import classNames from 'classnames';

import { useGlobalContext } from 'context';

import styles from '../styles.module.scss';

interface SignFormProps {
  setShow: (flag: boolean) => void;
  signature: string;
  setSignature: (signature: string) => void;
  setMessage: (message: string) => void;
}

export const SignMessageForm = ({
  signature,
  setSignature,
  setMessage,
  setShow
}: SignFormProps) => {
  const { theme } = useGlobalContext();

  const initialValues = { message: '' };

  const onSubmit = () => {
    setShow(true);
  };

  const schema = string().required('Required');
  const validationSchema = object().shape({
    message: schema
  });

  const formikProps = {
    initialValues,
    onSubmit,
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
        {({ resetForm, setFieldValue }) => (
          <Form className={styles.sign}>
            <div className={styles.form}>
              <label className={styles.label}>Sign Message</label>

              <Field
                name='message'
                type='text'
                className={styles.field}
                autoComplete='off'
                onChange={(e: ChangeEvent<HTMLFormElement>) => {
                  setMessage(e.target.value);
                  setFieldValue('message', e.target.value);
                }}
              />

              <ErrorMessage
                name='message'
                className={styles.error}
                component='div'
              />
            </div>

            {signature && (
              <div className={styles.result}>
                <strong>Signature:</strong>

                <span className={styles.value}>{signature}</span>

                <CopyButton text={signature} className={styles.copy} />
              </div>
            )}

            <div className={styles.buttons}>
              <button
                type='submit'
                className={classNames(styles.button, styles.active, {
                  [styles.white]: theme === 'light'
                })}
              >
                Sign
              </button>

              {signature && (
                <button
                  type='button'
                  className={classNames(styles.button, {
                    [styles.white]: theme === 'light'
                  })}
                  onClick={() => {
                    setSignature('');
                    resetForm();
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
