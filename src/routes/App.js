import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/index.scss';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Home from '../pages/presentational/Home';
import NotFound from '../pages/presentational/NotFound';
import Pubs from '../pages/Pubs';
import UserDetailsContainer from '../pages/UserDetailsContainer';
import UserEdit from '../pages/UserEdit';
import UserNew from '../pages/UserNew';
import Users from '../pages/Users';
import { restoreToken } from '../redux/actions';
import RouteAuth from './RouteAuth';

/**
 *
 * @param {{
 *  restoreToken: restoreToken;
 * }} props
 * @returns
 */
const App = (props) => {
  const { restoreToken } = props;

  useEffect(() => restoreToken(), []);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* https://stackoverflow.com/questions/52540050/if-condition-to-change-route-using-react-router-v4 */}
          <RouteAuth auth exact path='/users' component={Users} />
          <RouteAuth
            auth
            exact
            path='/users/:userId'
            component={UserDetailsContainer}
          />
          <RouteAuth
            auth
            exact
            path='/users/:userId/edit'
            component={UserEdit}
          />
          <RouteAuth exact path='/login' component={Login} />
          <RouteAuth exact path='/signup' component={UserNew} />
          <RouteAuth auth exact path='/pubs' component={Pubs} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  restoreToken,
};

export default connect(null, mapDispatchToProps)(App);
