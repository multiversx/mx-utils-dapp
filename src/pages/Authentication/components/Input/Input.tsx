import { memo } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

import { Textarea } from './components/Textarea';
import { Status } from './components/Status';

import type { FormValuesType, InputPropsType } from './types';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Input = memo((props: InputPropsType) => {
  const { setMetrics, setShow, chain } = props;

  const initialValues = {
    [EnvironmentsEnum.mainnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmQ4YjgzMDA1ZjRjY2M3OTRhYWFkZThmODE1ZDBjYjhiYWM1NTVkYjY2ZGJlOWJiZTg0MzZjMWU3ZWQ0YzZlNDYuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOek01TlRBME5EWjk.a902ddd844a3a9c47f724b5fc65ff50370abd5298ed4207307e7113e273d3cb4501516a65f1ead3e1d7d10a9ea2554645e1e51b96826b649a3ce37c2528f1606'
    },
    [EnvironmentsEnum.devnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLjUyOGYwM2FkOWIwNjg3NTcyMDllNzY3YjE2ZjE3YmNhOTJjNzAzYzZiYzE0NmFiNzEyMGZhNmVjNzJlZDJhMDIuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOek01TlRBMU56aDk.fa1cd80efc40effae33e7b0d6540476bd4309152a4642f9efd64335b7c3d0948f39f168893d18bc8712021a1456dd55034e89338a29c39f7d1b71471a0665205'
    },
    [EnvironmentsEnum.testnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmE2NDU0MzUxYTc4MGExNTBlMDljNjg5ZTA1MzZjYTkxY2U0NzhhMmNiYTA1N2RkNmE2NGViZDJlYmQ3YmJhNWIuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOek01TlRBMk9EQjk.3c2f1ed4deb9f01858ef6415c3b6ba90274395bcb26ab12764c59966909f30a81e2522d2aff33d48e3ba8f1b5f2f48ce62975465be64e43991e31b269cff1a0d'
    }
  }[chain];

  /*
   * Return the rendered component.
   */

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validateOnMount={true}
      enableReinitialize={true}
    >
      {(props: FormikProps<FormValuesType>) => (
        <Form className={styles.form}>
          <h3 className={styles.subtitle}>
            Paste a token here
            <button onClick={() => setShow(true)} className={styles.generate}>
              Generate new token
            </button>
          </h3>

          <Textarea {...props} setMetrics={setMetrics} chain={chain} />
          <Status {...props} />
        </Form>
      )}
    </Formik>
  );
});
