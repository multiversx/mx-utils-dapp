import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { MvxCopyButton } from 'lib';

import styles from './styles.module.scss';
import type { ConverterType, SubmitType } from './types';

/*
 * Handle the component declaration.
 */

export const Converter = (props: ConverterType) => {
  const { label, compute, validate, identifier } = props;

  const [value, setValue] = useState('');
  const initialValues = { converter: '' };

  /*
   * Update the computed value to the current state.
   */

  const onSubmit = useCallback(
    (payload: SubmitType) => {
      setValue(compute(payload.converter));
    },
    [compute]
  );

  /*
   * Set up the validation schema with conditional testing.
   */

  const schema = string().required(validate.required);
  const validationSchema = object().shape({
    converter: validate.test
      ? schema.test(
          `${identifier}-is-valid`,
          validate.test.error,
          validate.test.callback
        )
      : schema
  });

  const formikProps = {
    initialValues,
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false
  };

  /*
   * Return the rendered component.
   */

  return (
    <Formik {...formikProps}>
      {({ resetForm }) => (
        <Form className={styles.converter}>
          <div className={styles.form} data-testid={`${identifier}-form`}>
            <label className={styles.label} data-testid={`${identifier}-label`}>
              {label}
            </label>

            <Field
              name='converter'
              type='text'
              className={styles.field}
              autoComplete='off'
              data-testid={`${identifier}-field`}
              data-cy='input-converter'
            />

            <ErrorMessage
              data-testid={`${identifier}-error`}
              data-cy='error'
              name='converter'
              className={styles.error}
              component='div'
            />
          </div>

          {value && (
            <div className={styles.result}>
              <strong>Result:</strong>

              <span
                data-testid={`${identifier}-value`}
                data-cy='converter-result'
                className={styles.value}
              >
                {value}
              </span>

              <MvxCopyButton text={value} className={styles.copy} />
            </div>
          )}

          <div className={styles.buttons}>
            <button
              type='submit'
              data-testid={`${identifier}-submit-button`}
              className={classNames(styles.button, styles.active)}
            >
              Convert
            </button>

            {value && (
              <button
                type='button'
                data-testid={`${identifier}-clear-button`}
                className={classNames(styles.button)}
                onClick={() => {
                  setValue('');
                  resetForm();
                }}
              >
                Clear
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
