import React, { useEffect, useState } from 'react';
import { Template } from 'components/Template';
import { useSearchParams } from 'react-router-dom';

import { useSignMessage } from '@multiversx/sdk-dapp/hooks/signMessage/useSignMessage';
import { useGetSignMessageInfoStatus } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignedMessageStatus';

import { logout } from '@multiversx/sdk-dapp/utils/logout';

import styles from './styles.module.scss';
import { Generate } from 'pages/Authentication/components/Generate';
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
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export const SignMessage = () => {
  const { signMessage } = useSignMessage();
  const { isPending } = useGetSignMessageInfoStatus();

  const [messageToSign, setMessageToSign] = useState('');
  const [signatureFromSignedMessage, setSignatureFromSignedMessage] =
    useState('');
  const [showProvidersModal, setShowProvidersModal] = useState(false);
  const [initialVerifyFormValues, setInitialVerifyFormValues] =
    useState<InitialVerifyFormValuesType>({
      message: '',
      signature: '',
      address: ''
    });

  const [searchParams] = useSearchParams();

  const handleSignMessage = async () => {
    const signableMessage = await signMessage({
      message: messageToSign
    });

    if (!signableMessage) {
      logout();
      return;
    }

    const hexSignature = signableMessage.getSignature().toString('hex');

    setSignatureFromSignedMessage(hexSignature);

    if (!isPending) {
      logout();
    }
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
      setSignatureFromSignedMessage(signatureParam);
    }
  };

  useEffect(populateInitialVerifyFormFields, [searchParams]);

  return (
    <>
      <Template>
        <Generate
          chain={EnvironmentsEnum.mainnet}
          show={showProvidersModal}
          setShow={setShowProvidersModal}
          callbackAfterLogin={handleSignMessage}
        />
        <div className={styles.container}>
          <SignMessageForm
            setShow={setShowProvidersModal}
            signature={signatureFromSignedMessage}
            setSignature={setSignatureFromSignedMessage}
            setMessage={setMessageToSign}
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
