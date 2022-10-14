import { PropsWithChildren } from 'react';

import useTheme from 'helpers/useTheme';
import { Navbar } from 'components/Layout/Navbar';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  useTheme();

  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export { Layout };
