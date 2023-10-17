import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';

export const useGetNativeAuthToken = () => {
  const { tokenLogin } = useGetLoginInfo();
  return tokenLogin?.nativeAuthToken;
};
