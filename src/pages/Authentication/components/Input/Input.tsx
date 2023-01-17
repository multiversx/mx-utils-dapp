import { memo } from 'react';
import { Formik, Form, FormikProps } from 'formik';

import { Textarea } from './components/Textarea';
import { Status } from './components/Status';

import type { FormValuesType, InputPropsType } from './types';

import styles from './styles.module.scss';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

/*
 * Handle the component declaration.
 */

export const Input = memo((props: InputPropsType) => {
  const { setMetrics, setShow, chain } = props;

  const initialValues = {
    [EnvironmentsEnum.mainnet]: {
      token:
        'ZXJkMXdoOWMwc2pyMnhuOGh6ZjAybHd3Y3I0amsyczg0dGF0OXVkMmthcTZ6cjd4enB2bDlsNXE4YXdtZXg.Ykc5allXeG9iM04wLmEwNjhiNDgxYjIyY2I4N2ZmOTRlY2IyYmIwNjNkMTgzNmFkMjM2YzQyMTc4YzdmYmM3ZGVjNTAyM2JkYmZmMjYuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOek00T0RZeU1qSjk.8345772c09cbd6ba208411e2bf212878d7c968741fb9bf78f8c77fc7764a9615409f941c0fb668ad4b0ce0eb94350af756b36678afe7b3248c72a923e7b94004'
    },
    [EnvironmentsEnum.devnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmE3MTY5NzIwOGM4OWMxZTAyMDY5NzU3NGE0OGVjMTY2NjAyMjg3MmQ3MDI3M2UwOWM2N2E4OTVmMTJiYTQwN2IuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOekl5TXpBMU1qaDk.53121b33a2b1d95fe5a016588b8cdb3a17bfec55f2b39e977ff0c468dc0ceed53375344abb13c1f2ee819eef425c0a3f0202e9ced01bf195a74e9066e956da00'
    },
    [EnvironmentsEnum.testnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmE3MTY5NzIwOGM4OWMxZTAyMDY5NzU3NGE0OGVjMTY2NjAyMjg3MmQ3MDI3M2UwOWM2N2E4OTVmMTJiYTQwN2IuODY0MDAuZXlKMGFXMWxjM1JoYlhBaU9qRTJOekl5TXpBMU1qaDk.53121b33a2b1d95fe5a016588b8cdb3a17bfec55f2b39e977ff0c468dc0ceed53375344abb13c1f2ee819eef425c0a3f0202e9ced01bf195a74e9066e956da00'
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
