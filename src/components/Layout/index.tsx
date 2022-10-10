import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutPropsTypes {
  children: ReactNode;
}

const Layout = (props: LayoutPropsTypes) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
