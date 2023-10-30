import { useCallback, useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { useGetNativeAuthToken } from 'hooks/useGetNativeAuthToken';
import { FormValuesType } from '../../types';
import { useTokenActions } from '../../hooks/useTokenActions';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { splitToken } from './plugins/splitToken';
import { applyTokenColors } from './plugins/applyTokenColors';
import styles from './styles.module.scss';
import { useChain } from 'hooks/useChain';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export const Textarea = () => {
  const { handleChange } = useTokenActions();
  const { chain } = useChain();

  const defaultValues = {
    [EnvironmentsEnum.mainnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLmY2ODE3NzUxMDc1NmVkY2U0NWVjYTg0Yjk0NTQ0YTZlYWNkZmEzNmU2OWRmZDNiOGYyNGM0MDEwZDE5OTA3NTEuMzAwLmV5SjBhVzFsYzNSaGJYQWlPakUyTnpNNU56SXlORFI5.a29dba3f0d2fb4712cb662bc8050c87bf9f0e7fd28f3c98efe0fda074be5b087bd75c075243e832c2985a9da044496b2cff3c852c8c963f9d3d840aed8799c07'
    },
    [EnvironmentsEnum.devnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLjE4YmM5ODI0NjFkMWI1M2M4MzdhMjRkZTRiNDYyM2MyYmI4MzU4NjdlYTJlOGRmMTQzNjVjZjQzNmRlZTFiMjMuNjAwLmV5SjBhVzFsYzNSaGJYQWlPakUyTnpNNU56SXpOalI5.f8d651eda06e82a894ff1dc9480a33aa1030b076dfd5983346eec6793381587b88c2daf770a10ac39f9911968c2f1d1304c0c7dd86a82bc79f07e89f873f7e02'
    },
    [EnvironmentsEnum.testnet]: {
      token:
        'ZXJkMXdqeXRmbjZ6aHFmY3NlanZod3Y3cTR1c2F6czVyeWMzajhoYzc4ZmxkZ2pueWN0OHdlanFrYXN1bmM.Ykc5allXeG9iM04wLjdkNzQxODI3OTM0NWZiZjFiM2UwMDU0MDMyZDFjM2UzYjIzMjRiOTgyMjNjYzZhODI1ZTc2ZjRmYmZkNGE3ZGQuOTAwLmV5SjBhVzFsYzNSaGJYQWlPakUyTnpNNU56TTVNRFo5.6912c4dddb58fbc8aa3ee210c9a6e6e66847abcd6eebe72fe5b5df02632598c9b568c3b3499eea3d62f321db7aab3e5e7fef293f8ae17aaa6042141bd6a23208'
    }
  }[chain];

  const getInitialValuesAsync = useCallback(async () => {
    return (await new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultValues);
      }, 2000);
    })) as typeof defaultValues;
  }, [defaultValues]);

  const nativeAuthToken = useGetNativeAuthToken();
  const { values } = useFormikContext<FormValuesType>();

  useEffect(() => {
    getInitialValuesAsync().then((values) => {
      handleChange(values?.token);
    });
  }, []);

  useEffect(() => {
    if (nativeAuthToken) {
      handleChange(nativeAuthToken);
    }
  }, [handleChange, nativeAuthToken]);

  return (
    <div className={styles.textarea}>
      <Field component='textarea' name='token' className={styles.field} />

      <CodeEditor
        value={values.token}
        language='js'
        padding={15}
        className={styles.editor}
        rehypePlugins={[[splitToken], [applyTokenColors]]}
        onChange={handleChange}
      />

      <div className={styles.buttons}>
        <CopyButton text={values.token} className={styles.copy} />
      </div>
    </div>
  );
};
