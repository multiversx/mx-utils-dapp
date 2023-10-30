import { useCallback } from 'react';
import { logout } from '@multiversx/sdk-dapp/utils/logout';

export const useLogout = () => {
  const clearStorage = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return useCallback(
    async (
      callbackUrl?: string,
      onRedirect?: (callbackUrl?: string) => void,
      shouldAttemptRelogin?: boolean
    ) => {
      clearStorage();
      await logout(callbackUrl, onRedirect, shouldAttemptRelogin);
    },
    [clearStorage]
  );
};
