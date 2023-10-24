import { Template } from 'components/Template';
import { AuthenticationContent } from './AuthenticationContent';
import { useAuthenticationValue } from './context/AuthenticationContext';
import { AuthenticationProvider } from './context/AuthenticationProvider';

export const Authentication = () => {
  return (
    <Template>
      <AuthenticationProvider value={useAuthenticationValue()}>
        <AuthenticationContent />
      </AuthenticationProvider>
    </Template>
  );
};
