import { memo } from 'react';
import { Formik, Form, FormikProps } from 'formik';

import { Textarea } from './components/Textarea';
import { Status } from './components/Status';

import type { FormValuesType, InputPropsType } from './types';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Input = memo((props: InputPropsType) => {
  const { setMetrics } = props;

  const initialValues = {
    token:
      'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmE3MTY5NzIwOGM4OWMxZTAyMDY5NzU3NGE0OGVjMTY2NjAyMjg3MmQ3MDI3M2UwOWM2N2E4OTVmMTJiYTQwN2IuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOekl5TXpBMU1qaDk.53121b33a2b1d95fe5a016588b8cdb3a17bfec55f2b39e977ff0c468dc0ceed53375344abb13c1f2ee819eef425c0a3f0202e9ced01bf195a74e9066e956da00'
  };

  /*
   * Return the rendered component.
   */

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validateOnMount={true}
    >
      {(props: FormikProps<FormValuesType>) => (
        <Form className={styles.form}>
          <h3 className={styles.subtitle}>Paste a token here</h3>

          <Textarea {...props} setMetrics={setMetrics} />
          <Status {...props} />
        </Form>
      )}
    </Formik>
  );
});
