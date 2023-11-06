import { Address, SignableMessage } from '@multiversx/sdk-core';
import { UserVerifier } from '@multiversx/sdk-wallet';

export const verifySignature = (
  address: string,
  messageString: string,
  signature: Uint8Array,
) => {
  const verifier = UserVerifier.fromAddress(Address.fromBech32(address));
  const signableMessage = new SignableMessage({
    address: Address.fromBech32(address),
    message: Buffer.from(messageString, 'utf8'),
  });

  const cryptoMessage = Buffer.from(signableMessage.serializeForSigning());

  try {
    return verifier.verify(cryptoMessage, Buffer.from(signature));
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};
