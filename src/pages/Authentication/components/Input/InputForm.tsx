import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { Textarea } from './components/Textarea';
import { Status } from './components/Status';
import { Form } from 'formik';
import { useInputActions } from './hooks/useInputActions';

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
