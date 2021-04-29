import React from 'react';
import NavBar from './NavBar';

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
