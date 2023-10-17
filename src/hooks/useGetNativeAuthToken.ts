import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';

export const useGetNativeAuthToken = () => {
  const { tokenLogin } = useGetLoginInfo();

  console.log('nativeAuthToken = ', tokenLogin?.nativeAuthToken);

  return tokenLogin?.nativeAuthToken;
};
