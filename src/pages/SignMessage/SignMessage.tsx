import {
  SignMessageSection,
  VerifySignatureForm,
  VerifySignatureFormFields
} from './components';
import {
  SignMessageSectionProvider,
  useSignMessageSectionValue
} from './context';
import styles from './styles.module.scss';

export const SignMessage = () => {
  return (
    <div className={styles.container}>
      <SignMessageSectionProvider value={useSignMessageSectionValue()}>
        <SignMessageSection />
      </SignMessageSectionProvider>
      <VerifySignatureForm />
      <VerifySignatureFormFields />
    </div>
  );
};
