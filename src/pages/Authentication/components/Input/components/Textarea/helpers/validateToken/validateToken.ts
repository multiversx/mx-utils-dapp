import { NativeAuthServer } from '@elrondnetwork/native-auth-server';

import type { NativeAuthServerConfig } from '@elrondnetwork/native-auth-server/lib/src/entities/native.auth.server.config';

export const validateToken = async (
  token: string,
  config: Partial<NativeAuthServerConfig>
) => {
  try {
    const server = new NativeAuthServer(config);
    const valid = await server.validate(token);

    return valid;
  } catch {
    throw new Error('Invalid token.');
  }
};
