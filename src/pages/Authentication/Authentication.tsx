import { AuthenticationContent } from './AuthenticationContent';
import { AuthenticationProvider, useAuthenticationValue } from './context';

export const Authentication = () => {
  return (
    <AuthenticationProvider value={useAuthenticationValue()}>
      <AuthenticationContent />
    </AuthenticationProvider>
  );
};
