import { useCallback } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { signMessage } from '@multiversx/sdk-dapp/utils';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { MESSAGE_KEY, SIGNATURE_KEY, STATUS_KEY } from 'localConstants/storage';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import { routeNames } from 'routes';

export const useSignMessageSectionActions = () => {
  const { setSignedMessagePayload, messageToSign } =
    useSignMessageSectionContext();

  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const callbackRoute = useCallbackRoute();

  const [searchParams] = useSearchParams();

  const handleSignMessage = useCallback(async () => {
    searchParams.delete(SIGNATURE_KEY);
    searchParams.delete(STATUS_KEY);

    if (!isLoggedIn) {
      const route = search
        ? `${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
        : `${routeNames.unlock}?callbackUrl=${callbackRoute}`;
      const isWallet = loginMethod === LoginMethodsEnum.wallet;

      navigate(
        isWallet
          ? encodeURIComponent(route)
          : `${route}?${MESSAGE_KEY}=${messageToSign}`,
      );
      return;
    }

    const signableMessage = await signMessage({
      message: messageToSign,
      callbackRoute: `${routeNames.signMessage}${search}`,
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
    setSignedMessagePayload,
  ]);

  return {
    handleSignMessage,
  };
};
