import styles from '../styles.module.scss';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { useCallback, useEffect, useState } from 'react';
import useUploadWasmCode from '../hooks/useUploadWasmCode';
import { useGetDeployedContractAddress } from '../hooks/useGetDeployedContractAddress';
import { usePersistedState } from 'hooks/usePersistedState';
import { DeployOrUpgradeParamsType } from '../types/deployOrUpgradeParams';
import { useDeployments } from '../hooks/useDeployments';
import { useGetAccount, useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { UPGRADE_SESSION_ID } from 'localConstants/storage';

export const UpgradeSection = () => {
  const [sessionId, setSessionId] = usePersistedState({
    storage: localStorage,
    key: UPGRADE_SESSION_ID,
    initialValue: ''
  });
  const [upgradeContractAddress, setUpgradeContractAddress] =
    useState<string>('');

  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccount();

  const { wasmCode, onUpload } = useUploadWasmCode();
  const { contractOrDeployerAddress } =
    useGetDeployedContractAddress(sessionId);
  const { upgrade } = useDeployments();

  const callbackRoute = useCallbackRoute();
  const navigate = useNavigate();

  const handleUpgrade = useCallback(async () => {
    if (!wasmCode || !isLoggedIn || !address) {
      return;
    }

    const params: DeployOrUpgradeParamsType = {
      code: wasmCode,
      args: [],
      gasLimit: 60000000,
      address: upgradeContractAddress
    };

    const response = await upgrade(params);
    setSessionId(response.sessionId ?? '');
  }, [address, isLoggedIn, upgrade, upgradeContractAddress, wasmCode]);

  const submitUpgrade = () => {
    if (isLoggedIn) {
      handleUpgrade();
    } else {
      navigate(`${routeNames.unlock}?callbackUrl=${callbackRoute}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn && Boolean(address)) {
      handleUpgrade();
    }
  }, [isLoggedIn, address]);

  return (
    <div className={styles.smartcontract}>
      <div className={styles.form}>
        <div className={styles.upload}>
          <label htmlFor='upgrade_file_input' className={styles.label}>
            Upload .wasm file
          </label>
          <input
            onChange={onUpload}
            className={styles.field}
            id='upgrade_file_input'
            type='file'
            accept='.wasm'
          />
        </div>
        <div className={styles.upload}>
          <label htmlFor='contract_address' className={styles.label}>
            Contract Address
          </label>
          <input
            id='contract_address'
            type='text'
            className={styles.field}
            autoComplete='off'
            value={upgradeContractAddress}
            onChange={(e) => setUpgradeContractAddress(e.target.value)}
          />
        </div>
        {!upgradeContractAddress && (
          <div className={styles.error}>
            <span>Contract address is required</span>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            onClick={submitUpgrade}
            className={styles.button}
            disabled={!wasmCode || !upgradeContractAddress}
          >
            Upgrade
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
            <strong>Deployer Address:</strong>
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
