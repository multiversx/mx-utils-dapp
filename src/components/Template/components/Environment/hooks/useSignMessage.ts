import { useCallback } from 'react';
import { getAccountProvider, Message } from 'lib';

export const useSignMessage = () => {
  const provider = getAccountProvider();

  return useCallback(
    async (messageToSign: Message): Promise<Message> => {
      if (!provider) {
        throw new Error('No provider available for signing message');
      }

      const signedMessage = await provider.signMessage(messageToSign);

      if (!signedMessage) {
        throw new Error('Failed to sign message - no signature returned');
      }

      return signedMessage;
    },
    [provider]
  );
};
