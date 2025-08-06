import {
  Address,
  Message,
  MessageComputer,
  UserVerifier
} from '@multiversx/sdk-core';

export const verifySignature = (
  address: string,
  messageString: string,
  signature: Uint8Array
) => {
  const messageComputer = new MessageComputer();
  const bech32Address = Address.newFromBech32(address);
  const verifier = UserVerifier.fromAddress(bech32Address);

  const message = new Message({
    address: new Address(address),
    data: Buffer.from(messageString, 'utf8')
  });

  const cryptoMessageBuffer = Buffer.from(
    messageComputer.computeBytesForVerifying(message)
  );
  const signatureBuffer = Buffer.from(signature);

  try {
    return verifier.verify(cryptoMessageBuffer, signatureBuffer);
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};
