import { useGetLoginInfo } from 'lib';

export const useGetNativeAuthToken = () => {
  const { tokenLogin } = useGetLoginInfo();
  return tokenLogin?.nativeAuthToken;
};
