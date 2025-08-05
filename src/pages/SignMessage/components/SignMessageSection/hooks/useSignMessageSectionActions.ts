import { useCallback } from 'react';
import { Message, MessageComputer } from '@multiversx/sdk-core';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { MESSAGE_KEY, SIGNATURE_KEY, STATUS_KEY } from 'localConstants/storage';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import { routeNames } from 'routes';
import { getAccountProvider, useGetIsLoggedIn } from 'lib';

export const useSignMessageSectionActions = () => {
  const { setSignedMessagePayload, messageToSign } =
    useSignMessageSectionContext();

  const { search } = useLocation();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const callbackRoute = useCallbackRoute();
  const provider = getAccountProvider();

  const [searchParams] = useSearchParams();

  const handleSignMessage = useCallback(async () => {
    searchParams.delete(SIGNATURE_KEY);
    searchParams.delete(STATUS_KEY);
    const messageComputer = new MessageComputer();

    if (!isLoggedIn) {
      const route = search
        ? `${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
        : `${routeNames.unlock}?callbackUrl=${callbackRoute}`;

      navigate(`${route}?${MESSAGE_KEY}=${messageToSign}`);
      return;
    }

    const message = new Message({
      data: new Uint8Array(Buffer.from(messageToSign))
    });
    const messageResponse = await provider.signMessage(message);

    if (!messageResponse) {
      return;
    }

    const packedMessage = messageComputer.packMessage(messageResponse);

    setSignedMessagePayload(JSON.stringify(packedMessage, null, 2));
  }, [
    callbackRoute,
    isLoggedIn,
    messageToSign,
    navigate,
    search,
    setSignedMessagePayload
  ]);

  return {
    handleSignMessage
  };
};
