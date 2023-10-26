import { routeNames } from 'routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { SignedMessageStatusesEnum } from 'pages/SignMessage/types';
import { Address, SignableMessage } from '@multiversx/sdk-core';
import { useFormikContext } from 'formik';
import { SignMessageFormValues } from '../types';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import { useCallback } from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { MESSAGE_KEY, SIGNATURE_KEY } from 'constants/storage';

export const useSignMessageForm = () => {
  const { setFieldValue } = useFormikContext<SignMessageFormValues>();
  const {
    signedMessagePayload,
    setSignedMessagePayload,
    setMessageToSign,
    persistedMessageToSign
  } = useSignMessageSectionContext();

  const [searchParams] = useSearchParams();
  const { address } = useGetAccountInfo();
  const { loginMethod } = useGetLoginInfo();
  const navigate = useNavigate();

  // This is the case when the user is not logged in, insert a message to sign and press the sign button
  // The user will be redirected to the unlock page, having the message to sign in the url (if is not web wallet) or in the session storage (if is web wallet)
  const buildSignaturePayloadFromWebWalletResponse = useCallback(() => {
    const signatureParam = searchParams.get(SIGNATURE_KEY) ?? '';
    const signStatusParam = searchParams.get('status');

    const isMessageSigned =
      signStatusParam === SignedMessageStatusesEnum.signed;

    // If the user is using the web wallet, we need to get the message from session storage
    if (loginMethod === LoginMethodsEnum.wallet && signatureParam) {
      setFieldValue('message', persistedMessageToSign);
      setMessageToSign(persistedMessageToSign);
    } else {
      // If the user is not using the web wallet, we need to get the message from the url
      const searchParamsMessage = searchParams.get(MESSAGE_KEY) ?? '';
      setFieldValue('message', searchParamsMessage);
      setMessageToSign(searchParamsMessage);
    }

    // If the user is using the web wallet, we need to get the signature from the url and compute the signed message payload to be consistent with the other providers
    if (signatureParam && isMessageSigned) {
      const signedPayload = new SignableMessage({
        ...(address ? { address: new Address(address) } : {}),
        message: Buffer.from(persistedMessageToSign)
      });

      const messageObj = JSON.parse(JSON.stringify(signedPayload));
      messageObj.signature = `0x${signatureParam}`;

      setSignedMessagePayload(JSON.stringify(messageObj, null, 2));
      navigate(routeNames.signMessage, { replace: true });
    }
  }, []);

  const handleClear = useCallback(() => {
    setSignedMessagePayload('');
    setMessageToSign('');
    setFieldValue('message', '');
  }, [setFieldValue, setMessageToSign, setSignedMessagePayload]);

  return {
    buildSignaturePayloadFromWebWalletResponse,
    handleClear,
    signedMessagePayload,
    setSignedMessagePayload
  };
};
