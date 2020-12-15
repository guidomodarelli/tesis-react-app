import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';

class RouteAuth extends Component {
  isAuthorizated = (auth, token) => (auth && token) || (!auth && !token);

  render() {
    const {
      exact,
      path,
      component,
      userToken,
      error,
      loading,
      auth,
    } = this.props;

    if (error) return <PageError />;
    if (loading) return <PageLoading />;
    if (this.isAuthorizated(auth, userToken)) {
      return <Route exact={exact} path={path} component={component} />;
    }
    return <>{auth ? <Redirect to='/login' /> : <Redirect to='/' />}</>;
  }
}

const mapStateToProps = ({ reducer }) => reducer;

export default connect(mapStateToProps)(RouteAuth);
