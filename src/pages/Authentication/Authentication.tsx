import { Template } from 'components/Template';
import { AuthenticationContent } from './AuthenticationContent';
import { AuthenticationProvider, useAuthenticationValue } from './context';

export const Authentication = () => {
  return (
    <Template>
      <AuthenticationProvider value={useAuthenticationValue()}>
        <AuthenticationContent />
      </AuthenticationProvider>
    </Template>
  );
};
