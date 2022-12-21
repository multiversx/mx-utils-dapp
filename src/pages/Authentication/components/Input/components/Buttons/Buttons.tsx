import { Fragment, MouseEvent } from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';

import type { ButtonsPropsType } from './types';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Buttons = (props: ButtonsPropsType) => {
  const { onReset, values, isSubmitting, resetForm } = props;

  const onClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    resetForm();
    onReset();
  };

  /*
   * Return the rendered component.
   */

  return (
    <Fragment>
      <ErrorMessage name='token' component='div' className={styles.error} />

      <div className={styles.buttons}>
        <button
          type='submit'
          disabled={isSubmitting}
          className={classNames(styles.button, {
            [styles.disabled]: isSubmitting
          })}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </button>

        {values.token && (
          <button type='button' className={styles.button} onClick={onClear}>
            Clear
          </button>
        )}
      </div>
    </Fragment>
  );
};
