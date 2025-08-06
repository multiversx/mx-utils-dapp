import { useCallback } from 'react';

import { PERSISTENCE_PREFIX } from 'localConstants';
import { getAccountProvider } from 'lib';

export const useLogout = () => {
  const provider = getAccountProvider();

  const safeClearSessionStorage = useCallback(() => {
    const utilsKeys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith(PERSISTENCE_PREFIX)
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

  return useCallback(async () => {
    clearStorage();
    if (provider.isInitialized()) {
      await provider.logout();
    }
  }, [clearStorage]);
};
