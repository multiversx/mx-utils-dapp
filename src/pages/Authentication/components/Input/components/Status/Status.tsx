import { useMemo } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TokenColorsEnum } from 'pages/Authentication/enum';

import type { FormikProps } from 'formik';
import type { FormValuesType } from '../../types';

import styles from './styles.module.scss';

export const Status = (props: FormikProps<FormValuesType>) => {
  const { errors, values } = props;

  const isError = useMemo(
    () => Boolean(errors.token) || !Boolean(values.token),
    [values.token, errors.token]
  );

  return (
    <div
      className={styles.status}
      style={{
        color: isError ? TokenColorsEnum.body : TokenColorsEnum.signature
      }}
    >
      <span className={styles.icon}>
        <FontAwesomeIcon icon={isError ? faTimes : faCheck} size='xs' />
      </span>

      <span className={styles.text}>
        {isError ? errors.token : 'Token Valid'}
      </span>
    </div>
  );
};
