import { memo } from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';

import { Textarea } from './components/Textarea';
import { Buttons } from './components/Buttons';

import { decodeToken } from './helpers/decodeToken';

import type { FormValuesType, InputPropsType } from './types';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Input = memo((props: InputPropsType) => {
  const { setMetrics, onReset } = props;

  const onSubmit = async (
    values: FormValuesType,
    helpers: FormikHelpers<FormValuesType>
  ) => {
    helpers.setSubmitting(true);

    if (!Boolean(values.token)) {
      helpers.setFieldError('token', 'Token required.');
      helpers.setSubmitting(false);
      onReset();
      return;
    }

    try {
      const decoded = await decodeToken(values.token);

      setMetrics(decoded);
      helpers.setSubmitting(false);
    } catch (error) {
      if (error instanceof Error) {
        onReset();
        helpers.setSubmitting(false);
        helpers.setFieldError('token', error.message);
      }
    }
  };

  /*
   * Return the rendered component.
   */

  return (
    <Formik onSubmit={onSubmit} initialValues={{ token: '' }}>
      {(props: FormikProps<FormValuesType>) => (
        <Form className={styles.form}>
          <h3 className={styles.subtitle}>Paste a token here</h3>

          <Textarea {...props} />
          <Buttons onReset={onReset} {...props} />
        </Form>
      )}
    </Formik>
  );
});
