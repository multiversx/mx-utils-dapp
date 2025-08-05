import CodeEditor from '@uiw/react-textarea-code-editor/esm';
import { Field, useFormikContext } from 'formik';

import { MvxCopyButton } from 'lib';

import { applyTokenColors } from './plugins/applyTokenColors';
import { splitToken } from './plugins/splitToken';
import styles from './styles.module.scss';
import { useTokenActions } from '../../hooks/useTokenActions';
import { FormValuesType } from '../../types';

export const Textarea = () => {
  const { handleChange } = useTokenActions();
  const { values } = useFormikContext<FormValuesType>();

  return (
    <div className={styles.textarea}>
      <Field component='textarea' name='token' className={styles.field} />

      <CodeEditor
        value={values.token}
        language='js'
        padding={15}
        className={styles.editor}
        rehypePlugins={[[splitToken], [applyTokenColors]]}
        onChange={handleChange}
      />

      <div className={styles.buttons}>
        <MvxCopyButton text={values.token} className={styles.copy} />
      </div>
    </div>
  );
};
