import 'bootswatch/dist/litera/bootstrap.min.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import UserDetails from '../pages/UserDetails';
import UserNew from '../pages/UserNew';
import UserEdit from '../pages/UserEdit';
import Users from '../pages/Users';
import api from '../utils/api';
import Layout from './Layout';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      error: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = async () => {
    try {
      const response = await api.loggedIn(localStorage.getItem('token'));
      const data = await response.json();
      this.setState({
        loggedIn: data.loggedIn,
        error: null,
      });
    } catch (error) {
      this.setState({
        loggedIn: false,
        error: error,
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={UserNew} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/:userId' component={UserDetails} />
            <Route exact path='/users/:userId/edit' component={UserEdit} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
