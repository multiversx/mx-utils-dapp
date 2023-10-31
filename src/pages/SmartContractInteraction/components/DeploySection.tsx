import styles from '../styles.module.scss';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import React, { useCallback, useEffect, useState } from 'react';
import useUploadWasmCode from '../hooks/useUploadWasmCode';
import { useDeployments } from '../hooks/useDeployments';
import { usePersistedState } from 'hooks/usePersistedState';
import {
  CodeMetadataType,
  DeployOrUpgradeParamsType
} from '../types/deployOrUpgradeParams';
import { useGetDeployedContractAddress } from '../hooks/useGetDeployedContractAddress';
import { useGetAccount, useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useNavigate } from 'react-router-dom';
import { useChain } from 'hooks/useChain';
import { routeNames } from 'routes';
import { DEPLOY_SESSION_ID } from 'constants/storage';
import { CodeMetadata } from './CodeMetadata';

export const DeploySection = () => {
  const [sessionId, setSessionId] = usePersistedState({
    storage: localStorage,
    key: DEPLOY_SESSION_ID,
    initialValue: ''
  });
  const [metadata, setMetadata] = useState<CodeMetadataType>({
    readable: true,
    upgradeable: true,
    payable: false,
    payableBySc: true
  });

  const { chain } = useChain();
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccount();

  const { wasmCode, onUpload } = useUploadWasmCode();
  const { contractOrDeployerAddress, setContractOrDeployerAddress } =
    useGetDeployedContractAddress(sessionId);
  const { deploy } = useDeployments({ chain });

  const callbackRoute = useCallbackRoute();
  const navigate = useNavigate();

  const handleDeploy = useCallback(async () => {
    if (!wasmCode || !isLoggedIn || !Boolean(address)) {
      return;
    }
    setContractOrDeployerAddress('');

    const params: DeployOrUpgradeParamsType = {
      code: wasmCode,
      args: [],
      gasLimit: 60000000,
      ...metadata
    };

    const response = await deploy(params);
    setSessionId(response.sessionId ?? '');
  }, [wasmCode, isLoggedIn, address, deploy, metadata]);

  const submitDeploy = () => {
    if (isLoggedIn) {
      handleDeploy();
    } else {
      navigate(`${routeNames.unlock}?callbackUrl=${callbackRoute}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn && Boolean(address)) {
      handleDeploy();
    }
  }, [isLoggedIn, address]);

  return (
    <div className={styles.smartcontract}>
      <div className={styles.form}>
        <div className={styles.upload}>
          <label htmlFor='deploy_file_input' className={styles.label}>
            Upload .wasm file
          </label>
          <input
            onChange={onUpload}
            className={styles.field}
            id='deploy_file_input'
            type='file'
            accept='.wasm'
          />
        </div>
        <CodeMetadata codeMetadata={metadata} onMetadataChange={setMetadata} />
        <div className={styles.buttons}>
          <button
            onClick={submitDeploy}
            className={styles.button}
            disabled={!wasmCode}
          >
            Deploy
          </button>
        </div>
        {wasmCode && (
          <textarea
            rows={10}
            className={styles.field}
            placeholder='.wasm code will be displayed here...'
            value={wasmCode?.toString()}
            readOnly={true}
          />
        )}
        {contractOrDeployerAddress && (
          <div className={styles.result}>
            <strong>Contract Address:</strong>
            <Trim className={styles.value} text={contractOrDeployerAddress} />
            <CopyButton
              text={contractOrDeployerAddress}
              className={styles.copy}
            />
          </div>
        )}
      </div>
    </div>
  );
};
