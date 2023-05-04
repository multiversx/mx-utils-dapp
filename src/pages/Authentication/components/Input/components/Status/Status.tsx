import { useMemo } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TokenColorsEnum } from 'pages/Authentication/enum';

import type { FormikProps } from 'formik';
import type { FormValuesType } from '../../types';

import styles from './styles.module.scss';

export const Status = (props: FormikProps<FormValuesType>) => {
  const { errors, values } = props;

  const isTokenError = useMemo(
    () => Boolean(errors.token) || !Boolean(values.token),
    [values.token, errors.token]
  );

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
