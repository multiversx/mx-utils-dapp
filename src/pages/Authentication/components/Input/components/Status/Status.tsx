import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenColorsEnum } from 'pages/Authentication/enum';
import type { FormValuesType } from '../../types';

import styles from './styles.module.scss';
import { useFormikContext } from 'formik';

export const Status = () => {
  const { errors, values } = useFormikContext<FormValuesType>();

  const isTokenError = Boolean(errors.token) || !Boolean(values.token);

  const isMessageError = errors.message;

  return (
    <div className={styles.statusContainer}>
      <div
        className={styles.status}
        style={{
          color: isTokenError ? TokenColorsEnum.body : TokenColorsEnum.signature
        }}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={isTokenError ? faTimes : faCheck} size='xs' />
        </span>

        <span className={styles.text}>
          {isTokenError ? errors.token : 'Token Valid'}
        </span>
      </div>
      {isMessageError && (
        <span
          className={styles.message}
          style={{ color: TokenColorsEnum.body }}
        >
          {errors.message}
        </span>
      )}
    </div>
  );
};
