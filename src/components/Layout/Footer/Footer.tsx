import { ReactComponent as HeartIcon } from 'assets/img/heart.svg';

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href='https://elrond.com/'
      target='_blank'
      rel='noreferrer'
      className={styles.elrond}
    >
      Made with <HeartIcon className={styles.heart} /> by Elrond Network.
    </a>
  </footer>
);

export { Footer };
