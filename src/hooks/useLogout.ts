import { useCallback } from 'react';
import { logout } from '@multiversx/sdk-dapp/utils/logout';

export const useLogout = () => {
  const safeClearSessionStorage = useCallback(() => {
    // keep all the values that starts with 'utils:' from sessionStorage and remove the rest of the values
    const utilsKeys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith('utils:'),
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
