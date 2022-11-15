import { Fragment } from 'react';

import useTheme from 'helpers/useTheme';

import type { PropsWithChildren } from 'react';

/*
 * Handle the component declaration.
 */

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  /*
   * Call the theme initializer hook.
   */

  useTheme();

  /*
   * Return the rendered component.
   */

  return <Fragment>{children}</Fragment>;
};

export default Layout;
