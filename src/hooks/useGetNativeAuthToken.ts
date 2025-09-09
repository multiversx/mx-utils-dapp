import { nativeAuth } from '@multiversx/sdk-dapp';
import { useGetAccountInfo, useGetLoginInfo } from 'lib';

export const useGetNativeAuthToken = () => {
  const { tokenLogin } = useGetLoginInfo();
  const { address } = useGetAccountInfo();

  if (tokenLogin?.nativeAuthToken) {
    return tokenLogin?.nativeAuthToken;
  }

  if (tokenLogin?.loginToken && tokenLogin?.signature && address) {
    const nativeAuthClient = nativeAuth();
    return nativeAuthClient.getToken({
      address,
      token: tokenLogin.loginToken,
      signature: tokenLogin.signature
    });
  }

  return;
};
