import { useCallback } from 'react';
import { Address, Message } from '@multiversx/sdk-core';
import { useFormikContext } from 'formik';
import { useLocation, useSearchParams } from 'react-router-dom';

import { MESSAGE_KEY, SIGNATURE_KEY, STATUS_KEY } from 'localConstants/storage';
import { ProviderTypeEnum, useGetAccountInfo, useGetLoginInfo } from 'lib';
import { useSignMessageSectionContext } from 'pages/SignMessage/context';
import { SignedMessageStatusesEnum } from 'pages/SignMessage/types';

import { SignMessageFormValues } from '../types';

export const useSignMessageForm = () => {
  const { setFieldValue } = useFormikContext<SignMessageFormValues>();
  const { setSignedMessagePayload, setMessageToSign, persistedMessageToSign } =
    useSignMessageSectionContext();

  const { address } = useGetAccountInfo();
  const { providerType } = useGetLoginInfo();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const entries = Object.fromEntries(new URLSearchParams(search));

  // This is the case when the user is not logged in, insert a message to sign and press the sign button
  // The user will be redirected to the unlock page, having the message to sign in the url (if is not web wallet) or in the session storage (if is web wallet)
  const buildSignaturePayloadFromWebWalletResponse = () => {
    const signatureParam = entries[SIGNATURE_KEY];
    const signStatusParam = entries[STATUS_KEY];

    const isMessageSigned =
      signStatusParam === SignedMessageStatusesEnum.signed;

    // If the user is using the web wallet, we need to get the message from session storage
    if (providerType === ProviderTypeEnum.crossWindow && signatureParam) {
      setFieldValue('message', persistedMessageToSign);
      setMessageToSign(persistedMessageToSign);
    } else {
      // If the user is not using the web wallet, we need to get the message from the url
      const searchParamsMessage = entries[MESSAGE_KEY];
      if (!searchParamsMessage) {
        return;
      }

      setFieldValue('message', searchParamsMessage);
      setMessageToSign(searchParamsMessage);
    }

    // If the user is using the web wallet, we need to get the signature from the url and compute the signed message payload to be consistent with the other providers
    if (signatureParam && isMessageSigned) {
      const signedPayload = new Message({
        ...(address ? { address: new Address(address) } : {}),
        data: Buffer.from(persistedMessageToSign)
      });

      const messageObj = JSON.parse(JSON.stringify(signedPayload));
      messageObj.signature = `0x${signatureParam}`;

      setSignedMessagePayload(JSON.stringify(messageObj, null, 2));
    }
  };

  const handleClear = useCallback(() => {
    setSignedMessagePayload('');
    setMessageToSign('');
    setFieldValue('message', '');
    setSearchParams({}, { replace: true });
  }, [
    setFieldValue,
    setMessageToSign,
    setSearchParams,
    setSignedMessagePayload
  ]);

  return {
    buildSignaturePayloadFromWebWalletResponse,
    handleClear
  };
};
