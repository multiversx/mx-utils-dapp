import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import { addressIsValid, verifyMessage } from 'lib';
import styles from 'pages/SignMessage/styles.module.scss';

import { InitialVerifyFormValuesType } from '../types';

export const VerifySignatureFormFields = () => {
  const [verifySuccess, setVerifySuccess] = useState<boolean>();

  const getSignedMessage = (values: InitialVerifyFormValuesType) => {
    const { address, message, signature } = values;

    const encodedMessage = Buffer.from(message, 'ascii').toString('hex');

    const signedMessageObj = {
      address,
      message: `0x${encodedMessage}`,
      signature: `0x${signature}`,
      version: 1,
      signer: 'ErdJS'
    };

    const signedMessage = JSON.stringify(signedMessageObj);

    return signedMessage;
  };

  const onSubmit = async (values: InitialVerifyFormValuesType) => {
    const signedMessage = getSignedMessage(values);

    const { isVerified } = await verifyMessage(signedMessage);
    setVerifySuccess(isVerified);
  };

  const validationSchema = object().shape({
    message: string().required('Required'),
    address: string()
      .required('Required')
      .test('addressIsValid', 'Invalid address', (value) =>
        Boolean(value && addressIsValid(value))
      ),
    signature: string()
      .required('Required')
      .test('signatureIsValid', 'Value must be base64 input', (value) => {
        if (!value) return false;

        try {
          atob(value);

          return true;
        } catch {
          return false;
        }
      })
  });

  const formikProps = {
    initialValues: {
      message: '',
      signature: '',
      address: ''
    },
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Complete the fields below to verify the signature
      </h3>

      <Formik {...formikProps} enableReinitialize>
        {({ resetForm, handleChange, values, setValues }) => (
          <Form className={styles.sign}>
            <div className={styles.form} style={{ marginBottom: '12px' }}>
              <label className={styles.label}>Signer address</label>

              <Field
                name='address'
                value={values.address}
                className={styles.field}
                autoComplete='off'
                onChange={handleChange}
              />

              <ErrorMessage
                name='address'
                className={styles.error}
                component='div'
              />
            </div>

            <div className={styles.form} style={{ marginBottom: '12px' }}>
              <label className={styles.label}>Signed message</label>

              <Field
                name='message'
                value={values.message}
                className={styles.field}
                autoComplete='off'
                placeholder='Insert or paste the message that was signed.'
                onChange={handleChange}
              />

              <ErrorMessage
                name='message'
                className={styles.error}
                component='div'
              />
            </div>

            <div className={styles.form}>
              <label className={styles.label}>Signature</label>

              <Field
                name='signature'
                value={values.signature}
                className={styles.field}
                autoComplete='off'
                placeholder="Insert or paste the signature. You don't have to add '0x' prefix."
                onChange={handleChange}
              />

              <ErrorMessage
                name='signature'
                className={styles.error}
                component='div'
              />
            </div>

            {verifySuccess !== undefined && (
              <div className={styles.result}>
                <strong>Signature:</strong>

                <span className={styles.value}>
                  {verifySuccess ? 'Valid' : 'Invalid'}
                </span>
              </div>
            )}

            <div className={styles.buttons}>
              <button
                type='submit'
                className={classNames(styles.button, styles.active)}
              >
                Verify
              </button>

              {verifySuccess !== undefined && (
                <button
                  type='button'
                  className={classNames(styles.button)}
                  onClick={() => {
                    resetForm();
                    setVerifySuccess(undefined);
                    setValues({
                      address: '',
                      message: '',
                      signature: ''
                    });
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
