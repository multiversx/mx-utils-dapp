import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { Template } from 'components/Template';
import React, { useState } from 'react';
import { getEnvironmentForChainId } from '@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId';
import { useLocation } from 'react-router-dom';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import styles from './styles.module.scss';
import { DeploySection } from './components/DeploySection';
import { UpgradeSection } from './components/UpgradeSection';
import { Environment } from './components/Environment';
import { NETWORK } from './constants';

export const SmartContractInteraction = () => {
  const { search } = useLocation();
  const { network } = useGetNetworkConfig();

  const entries = Object.fromEntries(new URLSearchParams(search));
  const environment = entries[NETWORK] as EnvironmentsEnum;
  const [chain, setChain] = useState<EnvironmentsEnum>(
    environment || getEnvironmentForChainId(network.chainId)
  );

  return (
    <Template>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Deploy Contract </h3>
            <Environment chain={chain} setChain={setChain} />
          </div>
          <DeploySection chain={chain} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Upgrade Contract </h3>
            <Environment chain={chain} setChain={setChain} />
          </div>
          <UpgradeSection chain={chain} />
        </div>
      </div>
    </Template>
  );
};
