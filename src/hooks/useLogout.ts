import { useCallback } from 'react';
import { logout } from '@multiversx/sdk-dapp/utils/logout';
import { PERSISTENCE_PREFIX } from 'localConstants';

export const useLogout = () => {
  const safeClearSessionStorage = useCallback(() => {
    const utilsKeys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith(PERSISTENCE_PREFIX),
    );
    const utilsValues = utilsKeys.map((key) => sessionStorage.getItem(key));
    sessionStorage.clear();
    utilsKeys.forEach((key, index) => {
      sessionStorage.setItem(key, utilsValues[index] ?? '');
    });
  }, []);

  const clearStorage = useCallback(() => {
    localStorage.clear();
    safeClearSessionStorage();
  }, [safeClearSessionStorage]);

  return useCallback(
    async (
      callbackUrl?: string,
      onRedirect?: (callbackUrl?: string) => void,
      shouldAttemptRelogin?: boolean,
    ) => {
      clearStorage();
      await logout(callbackUrl, onRedirect, shouldAttemptRelogin);
    },
    [clearStorage],
  );
};
