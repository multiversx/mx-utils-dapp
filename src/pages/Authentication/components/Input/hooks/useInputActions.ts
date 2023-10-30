import { useTokenActions } from './useTokenActions';
import { routeNames } from 'routes';
import { useLocation } from 'react-router-dom';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { useLogout } from 'hooks/useLogout';

export const useInputActions = () => {
  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();
  const callbackRoute = useCallbackRoute();
  const logout = useLogout();

  const { handleChange } = useTokenActions();

  const handleGenerateToken = async () => {
    const route = search
      ? `${window.location.origin}${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
      : `${window.location.origin}${routeNames.unlock}?callbackUrl=${callbackRoute}`;
    const isWallet = loginMethod === LoginMethodsEnum.wallet;
    const redirect = isWallet ? encodeURIComponent(route) : route;

    await logout(redirect);
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
