import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

/**
 *
 * @param {{
 *  children: JSX.Element;
 * }} props
 * @returns
 */
const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
