import { Template } from 'components/Template';

import styles from './styles.module.scss';

const Home = () => (
  <Template>
    <div className={styles.home}>
      <h1 className={styles.title}>Tools for the Elrond Blockchain</h1>

      <div className={styles.description}>
        This page offers an easy to use pack of tools necessary for interacting
        with Elrond Blockchain.
      </div>

      <div className={styles.description}>
        Browse the menu on the left for Elrond Tools.
      </div>
    </div>
  </Template>
);

export { Home };
