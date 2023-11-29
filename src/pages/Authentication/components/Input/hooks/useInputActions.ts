import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { useLocation } from 'react-router-dom';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useChain } from 'hooks/useChain';
import { useLogout } from 'hooks/useLogout';
import { GENERATED_TOKEN_CHAIN } from 'localConstants';
import { routeNames } from 'routes';
import { useTokenActions } from './useTokenActions';

export const useInputActions = () => {
  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();

  const callbackRoute = useCallbackRoute();
  const logout = useLogout();
  const { chain } = useChain();

  const { handleChange } = useTokenActions();

  const handleGenerateToken = async () => {
    sessionStorage.setItem(GENERATED_TOKEN_CHAIN, chain);

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
    handlePasteToken,
  };
};
