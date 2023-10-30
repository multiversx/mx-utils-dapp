import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { usePersistedState } from 'hooks/usePersistedState';
import { MESSAGE_TO_SIGN_KEY } from 'constants/storage';

export type SignMessageSectionContextType = {
  signedMessagePayload: string;
  setSignedMessagePayload: Dispatch<SetStateAction<string>>;
  messageToSign: string;
  setMessageToSign: (message: string) => void;
  persistedMessageToSign: string;
};

export const SignMessageSectionContext =
  createContext<SignMessageSectionContextType | null>(null);

export const useSignMessageSectionContext = () => {
  const context = useContext(SignMessageSectionContext);

  if (context === null) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }

  return context;
};

export const useSignMessageSectionValue = () => {
  const [persistedMessageToSign, persistMessageToSign] = usePersistedState({
    storage: sessionStorage,
    key: MESSAGE_TO_SIGN_KEY,
    initialValue: ''
  });

  const [signedMessagePayload, setSignedMessagePayload] = useState('');
  const [messageToSign, setMessage] = useState('');

  const setMessageToSign = useCallback(
    (message: string) => {
      persistMessageToSign(message);
      setMessage(message);
    },
    [persistMessageToSign]
  );

  return {
    signedMessagePayload,
    setSignedMessagePayload,
    messageToSign,
    setMessageToSign,
    persistedMessageToSign
  };
};
