import { ReactNode } from 'react';
import {
  AuthenticationContext,
  AuthenticationContextType
} from './AuthenticationContext';

export const AuthenticationProvider = ({
  value,
  children
}: {
  value: AuthenticationContextType;
  children: ReactNode;
}) => {
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
