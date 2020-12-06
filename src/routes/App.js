import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.css';
import '../assets/styles/index.css';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import UserDetailsContainer from '../pages/UserDetailsContainer';
import UserEdit from '../pages/UserEdit';
import UserNew from '../pages/UserNew';
import Users from '../pages/Users';
import { restoreToken } from '../redux/actions';
import RouteAuth from './RouteAuth';

const App = (props) => {

  useEffect(() => {
    props.restoreToken();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* https://stackoverflow.com/questions/52540050/if-condition-to-change-route-using-react-router-v4 */}
          <RouteAuth auth exact path='/users' component={Users} />
          <RouteAuth auth exact path='/users/:userId' component={UserDetailsContainer} />
          <RouteAuth auth exact path='/users/:userId/edit' component={UserEdit} />
          <RouteAuth exact path='/login' component={Login} />
          <RouteAuth exact path='/signup' component={UserNew} />
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
