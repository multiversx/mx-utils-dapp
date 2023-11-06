import { Address, SignableMessage } from '@multiversx/sdk-core';
import { UserVerifier } from '@multiversx/sdk-wallet';

export const verifySignature = (
  address: string,
  messageString: string,
  signature: Uint8Array,
) => {
  const bech32Address = Address.fromBech32(address);
  const verifier = UserVerifier.fromAddress(bech32Address);

  const signableMessage = new SignableMessage({
    address: bech32Address,
    message: Buffer.from(messageString, 'utf8'),
  });

  const cryptoMessageBuffer = Buffer.from(
    signableMessage.serializeForSigning(),
  );
  const signatureBuffer = Buffer.from(signature);

  try {
    return verifier.verify(cryptoMessageBuffer, signatureBuffer);
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};
