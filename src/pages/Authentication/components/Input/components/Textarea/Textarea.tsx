import { useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { FormValuesType } from '../../types';
import { useTokenActions } from '../../hooks/useTokenActions';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { splitToken } from './plugins/splitToken';
import { applyTokenColors } from './plugins/applyTokenColors';
import styles from './styles.module.scss';

export const Textarea = () => {
  const { handleInput, handleChange, moveCursorToEnd } = useTokenActions();

  const nativeAuthToken = useGetNativeAuthToken();
  const { values } = useFormikContext<FormValuesType>();

  useEffect(() => {
    if (nativeAuthToken) {
      handleChange(nativeAuthToken);
    }
  }, [handleChange, moveCursorToEnd, nativeAuthToken]);

  return (
    <div className={styles.textarea}>
      <Field component='textarea' name='token' className={styles.field} />

      <CodeEditor
        className={styles.editor}
        value={values.token}
        language='js'
        onChange={handleChange}
        onInput={handleInput}
        padding={15}
        rehypePlugins={[[splitToken], [applyTokenColors]]}
      />

      <div className={styles.buttons}>
        <CopyButton text={values.token} className={styles.copy} />
      </div>
    </div>
  );
};
