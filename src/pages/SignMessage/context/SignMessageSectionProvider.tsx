import { ReactNode } from 'react';
import {
  SignMessageSectionContext,
  SignMessageSectionContextType
} from './SignMessageSectionContext';

export const SignMessageSectionProvider = ({
  value,
  children
}: {
  value: SignMessageSectionContextType;
  children: ReactNode;
}) => {
  return (
    <SignMessageSectionContext.Provider value={value}>
      {children}
    </SignMessageSectionContext.Provider>
  );
};
