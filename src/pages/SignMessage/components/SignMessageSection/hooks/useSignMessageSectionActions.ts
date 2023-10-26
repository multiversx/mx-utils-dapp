import { useCallback } from 'react';
import { routeNames } from 'routes';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { signMessage } from '@multiversx/sdk-dapp/utils';
import { MESSAGE_KEY } from 'constants/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';

export const useSignMessageSectionActions = () => {
  const { setSignedMessagePayload, messageToSign } =
    useSignMessageSectionContext();

  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const callbackRoute = useCallbackRoute();

  const handleSignMessage = useCallback(async () => {
    if (!isLoggedIn) {
      const route = search
        ? `${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
        : `${routeNames.unlock}?callbackUrl=${callbackRoute}`;
      const isWallet = loginMethod === LoginMethodsEnum.wallet;

      navigate(
        isWallet
          ? encodeURIComponent(route)
          : `${route}?${MESSAGE_KEY}=${messageToSign}`
      );
      return;
    }

    const signableMessage = await signMessage({
      message: messageToSign,
      callbackRoute: routeNames.signMessage
    });

    if (!signableMessage) {
      return;
    }

    setSignedMessagePayload(JSON.stringify(signableMessage.toJSON(), null, 2));
  }, [
    callbackRoute,
    isLoggedIn,
    loginMethod,
    messageToSign,
    navigate,
    search,
    setSignedMessagePayload
  ]);

  return {
    handleSignMessage
  };
};
