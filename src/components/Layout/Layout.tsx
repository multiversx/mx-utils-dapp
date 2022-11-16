import { useTheme } from 'helpers/useTheme';

import type { PropsWithChildren } from 'react';

import styles from 'assets/sass/theme.module.scss';

/*
 * Handle the component declaration.
 */

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  /*
   * Call the theme initializer hook and get the current theme state.
   */

  const { theme } = useTheme();

  /*
   * Return the rendered component.
   */

  return <main className={styles[theme]}>{children}</main>;
};
