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
  // FIXME: Warning: findDOMNode is deprecated in
  // StrictMode. findDOMNode was passed an instance of Transition
  // which is inside StrictMode. Instead, add a ref directly to the
  // element you want to reference. Learn more about using refs
  // safely here: https://reactjs.org/link/strict-mode-find-node

  // SOLUTION: https://medium.com/trabe/getting-rid-of-finddomnode-method-in-your-react-application-a0d7093b2660#3f79
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
