import 'bootswatch/dist/litera/bootstrap.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.css';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import UserDetailsContainer from '../pages/UserDetailsContainer';
import UserEdit from '../pages/UserEdit';
import UserNew from '../pages/UserNew';
import Users from '../pages/Users';
import { isLoggedIn } from '../redux/actions/usersActions';

const App = (props) => {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={UserNew} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/:userId' component={UserDetailsContainer} />
          <Route exact path='/users/:userId/edit' component={UserEdit} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ usersReducers }) => ({ usersReducers });

const mapDispatchToProps = {
  isLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
