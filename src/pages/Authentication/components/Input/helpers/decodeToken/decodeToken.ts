import { NativeAuthServer } from '@elrondnetwork/native-auth-server';

export const decodeToken = async (token: string) => {
  try {
    const server = new NativeAuthServer();
    const result = await server.decode(token);

    return result;
  } catch {
    throw new Error('Invalid token.');
  }
};
