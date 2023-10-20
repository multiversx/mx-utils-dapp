import { Template } from 'components/Template';
import React from 'react';
import styles from './styles.module.scss';
import { DeploySection } from './components/DeploySection';
import { UpgradeSection } from './components/UpgradeSection';

export const SmartContractInteraction = () => {
  return (
    <Template>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Deploy Contract </h3>
          </div>
          <DeploySection />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}> Upgrade Contract </h3>
          </div>
          <UpgradeSection />
        </div>
      </div>
    </Template>
  );
};
