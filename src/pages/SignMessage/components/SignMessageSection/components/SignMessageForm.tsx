import { ChangeEvent, useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useExecuteOnce } from 'hooks/useExecuteOnce';
import { MvxCopyButton } from 'lib';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import styles from 'pages/SignMessage/styles.module.scss';
import { useSignMessageForm } from '../hooks/useSignMessageForm';
import { SignMessageFormValues } from '../types';

export const SignMessageForm = () => {
  const { setFieldValue } = useFormikContext<SignMessageFormValues>();
  const { messageToSign, setMessageToSign, signedMessagePayload } =
    useSignMessageSectionContext();
  const { handleClear } = useSignMessageForm();

  const executeOnce = useExecuteOnce();
  const { buildSignaturePayloadFromWebWalletResponse } = useSignMessageForm();

  useEffect(() => {
    executeOnce(buildSignaturePayloadFromWebWalletResponse);
  }, []);

  return (
    <Form className={styles.sign}>
      <div className={styles.form}>
        <label className={styles.label}>Sign Message</label>

        <Field
          name='message'
          type='text'
          className={styles.field}
          autoComplete='off'
          onChange={(e: ChangeEvent<HTMLFormElement>) => {
            setMessageToSign(e.target.value);
            setFieldValue('message', e.target.value);
          }}
        />

        <ErrorMessage name='message' className={styles.error} component='div' />
      </div>

      {signedMessagePayload && (
        <div className={styles.resultPayload}>
          <strong>Signature payload:</strong>

          <div className={styles.code}>
            <pre data-testid='signaturePayload' className={styles.value}>
              {signedMessagePayload}
            </pre>
            <MvxCopyButton
              text={signedMessagePayload}
              className={styles.copy}
            />
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

        {(signedMessagePayload || messageToSign) && (
          <button
            type='button'
            className={classNames(styles.button)}
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
    </Form>
  );
};
