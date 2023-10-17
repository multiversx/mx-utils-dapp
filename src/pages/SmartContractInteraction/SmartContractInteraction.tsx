import { Template } from 'components/Template';
import React from 'react';
import styles from './styles.module.scss';
import { DeploySection } from './components/DeploySection';
import { UpgradeSection } from './components/UpgradeSection';
import { useChain } from 'hooks/useChain';

export const SmartContractInteraction = () => {
  const { chain } = useChain();

  return (
    <Template>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Deploy Contract </h3>
          </div>
          <DeploySection chain={chain} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Upgrade Contract </h3>
          </div>
          <UpgradeSection chain={chain} />
        </div>
      </div>
    </Template>
  );
};
