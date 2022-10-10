import React, { useCallback, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CopyButton } from '@elrondnetwork/dapp-core/UI/CopyButton';
import { object, string } from 'yup';
import classNames from 'classnames';

import { ConverterType } from 'pages/Converters/categories';

import styles from './styles.module.scss';

interface SubmitType {
  converter: string;
}

const Converter = (props: ConverterType) => {
  const { label, compute, validate, identifier } = props;
  const [value, setValue] = useState('');
  const initialValues = { converter: '' };

  const onSubmit = useCallback(
    (payload: SubmitType) => {
      setValue(compute(payload.converter));
    },
    [compute]
  );

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
              className={classNames(styles.button, styles.active)}
            >
              Convert
            </button>

            <button
              className={classNames(styles.button, {
                [styles.active]: Boolean(value)
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

export default Converter;
