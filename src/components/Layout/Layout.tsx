import type { PropsWithChildren } from 'react';

import { useTheme } from 'helpers/useTheme';

import '../../assets/sass/theme.scss';

/*
 * Handle the component declaration.
 */

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  /*
   * Call the theme initializer hook.
   */

  useTheme();

  /*
   * Return the rendered component.
   */

  return <main>{children}</main>;
};
