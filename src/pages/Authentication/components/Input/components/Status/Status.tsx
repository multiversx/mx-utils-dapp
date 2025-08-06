import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormikContext } from 'formik';

import { TokenColorsEnum } from 'pages/Authentication/enum';
import { useAuthenticationContext } from 'pages/Authentication/context';
import type { FormValuesType } from '../../types';
import styles from './styles.module.scss';

export const Status = () => {
  const { errors, values } = useFormikContext<FormValuesType>();
  const { fetchingInitialTokens, isValidating } = useAuthenticationContext();

  const isTokenError = Boolean(errors.token) || !Boolean(values.token);

  const isMessageError = errors.message;

  if (fetchingInitialTokens || isValidating) {
    return (
      <div className={styles.statusContainer}>
        <div
          className={styles.status}
          style={{
            color: TokenColorsEnum.default
          }}
        >
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    );
  }

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
