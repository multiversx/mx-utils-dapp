import { Template } from 'components/Template';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

export const Page404 = () => (
  <Template>
    <div className={styles.page404}>
      <h1 className={styles.title} data-testid='page404-title'>
        404 - Page not found
      </h1>

      <div className={styles.description} data-testid='page404-description'>
        {`The page you're looking for doesn't seem to exist.`}
      </div>

      <div className={styles.description} data-testid='page404-description'>
        Browse the menu on the left or <a href='/'>return home</a>.
      </div>
    </div>
  </Template>
);
