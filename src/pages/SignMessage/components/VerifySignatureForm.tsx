import { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import classNames from 'classnames';
import styles from '../styles.module.scss';
import { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
import { verifyMessage } from '@multiversx/sdk-dapp/hooks/signMessage/verifyMessage';

export const VerifySignatureForm = () => {
  const [verifiedMessage, setVerifiedMessage] = useState<string>();
  const [signerAddress, setSignerAddress] = useState<string>();
  const [verifySuccess, setVerifySuccess] = useState<boolean>();

  const initialValues = { signedMessage: '' };

  const onSubmit = ({ signedMessage }: { signedMessage: string }) => {
    const { address, isVerified, message } = verifyMessage(signedMessage);
    setVerifiedMessage(message);
    setSignerAddress(address);
    setVerifySuccess(isVerified);
  };

  const resetVerifyFormResults = () => {
    setVerifiedMessage(undefined);
    setSignerAddress(undefined);
    setVerifySuccess(undefined);
  };

  const messageSchema = object().shape({
    signer: string().required(),
    signature: string().required(),
    version: number().required(),
    message: string().required(),
    address: string()
      .required()
      .test('addressIsValid', 'Invalid address', (value) =>
        Boolean(value && addressIsValid(value))
      )
  });

  const validationSchema = object().shape({
    signedMessage: string()
      .required('Required')
      .test('messageIsValid', 'Invalid signature payload', (value) => {
        try {
          const messageObj = JSON.parse(`${value}`);
          messageSchema.validateSync(messageObj);
          return true;
        } catch {
          return false;
        }
      })
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
        Paste in the signature payload you would like to verify
      </h3>

      <Formik {...formikProps}>
        {({ resetForm, handleChange, values }) => (
          <Form className={styles.sign}>
            <div className={styles.form}>
              <label className={styles.label}>Verify signature</label>

              <textarea
                name='signedMessage'
                value={values.signedMessage}
                className={styles.field}
                autoComplete='off'
                onChange={(e) => {
                  handleChange(e);
                  resetVerifyFormResults();
                }}
              />

              <ErrorMessage
                name='signedMessage'
                className={styles.error}
                component='div'
              />
            </div>

            {signerAddress && (
              <div className={styles.result}>
                <strong>Signing address:</strong>

                <span className={styles.value}>{signerAddress}</span>
              </div>
            )}

            {verifiedMessage && (
              <div className={styles.result}>
                <strong>Signed message:</strong>

                <span className={styles.value}>{verifiedMessage}</span>
              </div>
            )}

            {Boolean(verifySuccess) && (
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

              {verifiedMessage && (
                <button
                  type='button'
                  className={classNames(styles.button)}
                  onClick={() => {
                    resetForm();
                    resetVerifyFormResults();
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
