import React from 'react';
import { Template } from 'components/Template';
import styles from './styles.module.scss';
import {
  SignMessageSection,
  VerifySignatureForm,
  VerifySignatureFormFields
} from './components';
import {
  SignMessageSectionProvider,
  useSignMessageSectionValue
} from './context';

export const SignMessage = () => {
  return (
    <Template>
      <div className={styles.container}>
        <SignMessageSectionProvider value={useSignMessageSectionValue()}>
          <SignMessageSection />
        </SignMessageSectionProvider>
        <VerifySignatureForm />
        <VerifySignatureFormFields />
      </div>
    </Template>
  );
};
