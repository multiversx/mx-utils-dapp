import { HeartIcon } from 'assets/img/HeartIcon';

import { companyName, companyWebsite } from 'config';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Footer = () => (
  <footer className={styles.footer}>
    <a
      href={companyWebsite}
      target='_blank'
      rel='noreferrer'
      className={styles.multiversx}
    >
      Made with
      <span className={styles.heart}>
        <HeartIcon />
      </span>
      by {companyName}
    </a>
  </footer>
);
