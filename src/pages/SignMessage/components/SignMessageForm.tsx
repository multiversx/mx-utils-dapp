import { ChangeEvent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { object, string } from 'yup';
import classNames from 'classnames';
import styles from '../styles.module.scss';

interface SignFormProps {
  signedMessagePayload: string;
  setSignature: (signature: string) => void;
  setMessage: (message: string) => void;
  onSubmit: () => void;
}

export const SignMessageForm = ({
  signedMessagePayload,
  setSignature,
  setMessage,
  onSubmit
}: SignFormProps) => {
  const initialValues = { message: '' };

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

            {signedMessagePayload && (
              <div className={styles.resultPayload}>
                <strong>Signature payload:</strong>

                <div className={styles.code}>
                  <pre className={styles.value}>
                    {signedMessagePayload}
                    <CopyButton
                      text={signedMessagePayload}
                      className={styles.copy}
                    />
                  </pre>
                </div>
              </div>
            )}

            <div className={styles.buttons}>
              <button
                type='submit'
                className={classNames(styles.button, styles.active)}
              >
                Sign
              </button>

              {signedMessagePayload && (
                <button
                  type='button'
                  className={classNames(styles.button)}
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
