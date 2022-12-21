import { Template } from 'components/Template';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Home = () => (
  <Template>
    <div className={styles.home}>
      <h1 className={styles.title} data-testid='home-title'>
        Tools for the MultiversX Blockchain
      </h1>

      <div className={styles.description} data-testid='home-description'>
        This page offers an easy to use pack of tools necessary for interacting
        with MultiversX Blockchain.
      </div>

      <div className={styles.description} data-testid='home-description'>
        Browse the menu on the left for MultiversX Tools.
      </div>
    </div>
  </Template>
);
