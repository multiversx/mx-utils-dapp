import { ChangeEvent, useEffect } from 'react';
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useSignMessageForm } from '../hooks/useSignMessageForm';
import { SignMessageFormValues } from '../types';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import styles from 'pages/SignMessage/styles.module.scss';

export const SignMessageForm = () => {
  const { setFieldValue } = useFormikContext<SignMessageFormValues>();
  const { messageToSign, setMessageToSign } = useSignMessageSectionContext();
  const { signedMessagePayload, handleClear } = useSignMessageForm();

  const [searchParams] = useSearchParams();
  const { buildSignaturePayloadFromWebWalletResponse } = useSignMessageForm();

  useEffect(() => {
    buildSignaturePayloadFromWebWalletResponse();
  }, [buildSignaturePayloadFromWebWalletResponse, searchParams]);

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
            <pre className={styles.value}>{signedMessagePayload}</pre>
            <CopyButton text={signedMessagePayload} className={styles.copy} />
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
