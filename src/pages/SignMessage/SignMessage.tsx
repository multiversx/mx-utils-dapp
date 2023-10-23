import React, { useEffect, useState } from 'react';
import { Template } from 'components/Template';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSignMessage } from '@multiversx/sdk-dapp/hooks/signMessage/useSignMessage';
import styles from './styles.module.scss';
import {
  SignMessageForm,
  VerifySignatureForm,
  VerifySignatureFormFields
} from './components';
import {
  InitialVerifyFormValuesEnum,
  InitialVerifyFormValuesType,
  SignedMessageStatusesEnum
} from './types';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { routeNames } from 'routes';

export const SignMessage = () => {
  const { signMessage } = useSignMessage();

  const [messageToSign, setMessageToSign] = useState('');
  const [signedMessagePayload, setSignedMessagePayload] = useState('');
  const [initialVerifyFormValues, setInitialVerifyFormValues] =
    useState<InitialVerifyFormValuesType>({
      message: '',
      signature: '',
      address: ''
    });

  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const callbackRoute = useCallbackRoute();

  const handleSignMessage = async () => {
    if (!isLoggedIn) {
      const route = search
        ? `${routeNames.unlock}${search}&callbackUrl=${callbackRoute}`
        : `${routeNames.unlock}?callbackUrl=${callbackRoute}`;
      const isWallet = loginMethod === 'wallet';

      navigate(isWallet ? encodeURIComponent(route) : route);
    }

    const signableMessage = await signMessage({
      message: messageToSign
    });

    if (!signableMessage) {
      return;
    }

    setSignedMessagePayload(JSON.stringify(signableMessage.toJSON(), null, 2));
  };

  const populateInitialVerifyFormFields = () => {
    const addressParam =
      searchParams.get(InitialVerifyFormValuesEnum.address) ?? '';
    const messageParam =
      searchParams.get(InitialVerifyFormValuesEnum.message) ?? '';
    const signatureParam =
      searchParams.get(InitialVerifyFormValuesEnum.signature) ?? '';
    const signStatusParam = searchParams.get('status');

    const isMessageSigned =
      signStatusParam === SignedMessageStatusesEnum.signed;

    setInitialVerifyFormValues({
      address: addressParam,
      message: messageParam,
      signature: signatureParam
    });

    // This will set the signature in SignMessageForm after signing the message with web wallet
    if (signatureParam && isMessageSigned) {
      setSignedMessagePayload(signatureParam);
    }
  };

  useEffect(populateInitialVerifyFormFields, [searchParams]);

  return (
    <>
      <Template>
        <div className={styles.container}>
          <SignMessageForm
            signedMessagePayload={signedMessagePayload}
            setSignature={setSignedMessagePayload}
            setMessage={setMessageToSign}
            onSubmit={handleSignMessage}
          />

          <VerifySignatureForm />

          <VerifySignatureFormFields
            initialVerifyFormValues={initialVerifyFormValues}
          />
        </div>
      </Template>
      ;
    </>
  );
};
