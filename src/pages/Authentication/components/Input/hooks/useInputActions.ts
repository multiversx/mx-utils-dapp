import { useLocation } from 'react-router-dom';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useChain } from 'hooks/useChain';
import { useLogout } from 'hooks/useLogout';
import { GENERATED_TOKEN_CHAIN } from 'localConstants';
import { routeNames } from 'routes';
import { useTokenActions } from './useTokenActions';

export const useInputActions = () => {
  const { search } = useLocation();

  const callbackRoute = useCallbackRoute();
  const logout = useLogout();
  const { chain } = useChain();

  const { handleChange } = useTokenActions();

  const handleGenerateToken = async () => {
    sessionStorage.setItem(GENERATED_TOKEN_CHAIN, chain);

    const route = search
      ? `${window.location.origin}${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
      : `${window.location.origin}${routeNames.unlock}?callbackUrl=${callbackRoute}`;

    await logout(route);
  };

  const handlePasteToken = () => {
    navigator.clipboard.readText().then((text) => {
      handleChange(text);
    });
  };

  return {
    handleGenerateToken,
    handlePasteToken
  };
};
