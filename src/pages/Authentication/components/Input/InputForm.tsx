import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'formik';

import { Textarea } from './components/Textarea';
import { Status } from './components/Status';
import { useInputActions } from './hooks/useInputActions';
import styles from './styles.module.scss';

export const InputForm = () => {
  const { handleGenerateToken, handlePasteToken } = useInputActions();

  return (
    <Form className={styles.form}>
      <h3 className={styles.subtitle}>
        <span>Paste a token here</span>

        <div className={styles.wrapper}>
          <div
            onClick={handlePasteToken}
            className={styles.paste}
            title='Paste'
          >
            <FontAwesomeIcon icon={faPaste} size='lg' />
          </div>
          <button onClick={handleGenerateToken} className={styles.generate}>
            Generate
          </button>
        </div>
      </h3>

      <Textarea />
      <Status />
    </Form>
  );
};
