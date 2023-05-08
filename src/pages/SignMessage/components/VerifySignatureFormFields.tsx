import { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import { useGlobalContext } from 'context';

import styles from '../styles.module.scss';
import { verifyMessage } from '@multiversx/sdk-dapp/hooks/signMessage/verifyMessage';
import { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
import { InitialVerifyFormValuesType } from '../types';

interface VerifyValuesFormProps {
  initialVerifyFormValues: InitialVerifyFormValuesType;
}

export const VerifySignatureFormFields = ({
  initialVerifyFormValues
}: VerifyValuesFormProps) => {
  const { theme } = useGlobalContext();

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

  const onSubmit = (values: InitialVerifyFormValuesType) => {
    const signedMessage = getSignedMessage(values);

    const { isVerified } = verifyMessage(signedMessage);

    setVerifySuccess(isVerified);
  };

  const validationSchema = object().shape({
    message: string().required('Required'),
    address: string()
      .required('Required')
      .test('addressIsValid', 'Invalid address', (value) =>
        Boolean(value && addressIsValid(value))
      ),
    signature: string().required('Required')
  });

  const formikProps = {
    initialValues: initialVerifyFormValues,
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

              <input
                name='address'
                value={values.address}
                className={styles.field}
                key={initialVerifyFormValues.toString()}
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

              <input
                name='message'
                value={values.message}
                className={styles.field}
                key={initialVerifyFormValues.toString()}
                autoComplete='off'
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

              <input
                name='signature'
                value={values.signature}
                className={styles.field}
                key={initialVerifyFormValues.toString()}
                autoComplete='off'
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
                className={classNames(styles.button, styles.active, {
                  [styles.white]: theme === 'light'
                })}
              >
                Verify
              </button>

              {verifySuccess !== undefined && (
                <button
                  type='button'
                  className={classNames(styles.button, {
                    [styles.white]: theme === 'light'
                  })}
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
