import 'bootswatch/dist/litera/bootstrap.min.css';
import React from 'react';
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

export default App;
