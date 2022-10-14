import { useCallback, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CopyButton } from '@elrondnetwork/dapp-core/UI/CopyButton';
import { object, string } from 'yup';
import classNames from 'classnames';

import { useGlobalContext } from 'context';
import { ConverterType } from 'pages/Converters/categories';

import styles from './styles.module.scss';

interface SubmitType {
  converter: string;
}

const Converter = (props: ConverterType) => {
  const { label, compute, validate, identifier } = props;
  const { theme } = useGlobalContext();

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

  return (
    <Formik {...formikProps}>
      {({ resetForm }) => (
        <Form className={styles.converter}>
          <div className={styles.form}>
            <label className={styles.label}>{label}</label>

            <Field
              name='converter'
              type='text'
              className={styles.field}
              autoComplete='off'
            />

            <ErrorMessage
              name='converter'
              component='div'
              className={styles.error}
            />
          </div>

          {value && (
            <div className={styles.result}>
              <strong>Result:</strong> {value}
              <CopyButton
                text={value}
                className={classNames(styles.copy, {
                  [styles.active]: Boolean(value)
                })}
              />
            </div>
          )}

          <div className={styles.buttons}>
            <button
              type='submit'
              className={classNames(styles.button, styles.active, {
                [styles.white]: theme === 'light'
              })}
            >
              Convert
            </button>

            <button
              className={classNames(styles.button, {
                [styles.active]: Boolean(value),
                [styles.white]: theme === 'light'
              })}
              type='button'
              onClick={() => {
                setValue('');
                resetForm();
              }}
            >
              Clear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { Converter };
