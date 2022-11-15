import HeartIcon from 'assets/img/HeartIcon';

import { companyName, companyWebsite } from 'config';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href={companyWebsite}
      target='_blank'
      rel='noreferrer'
      className={styles.elrond}
    >
      Made with
      <span className={styles.heart}>
        <HeartIcon />
      </span>
      by {companyName}
    </a>
  </footer>
);

export default Footer;
