import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import UserNew from '../pages/UserNew';
import api from '../utils/api';
import Layout from './Layout';
import './styles/App.css';
import Users from '../pages/Users';
import 'bootswatch/dist/litera/bootstrap.min.css'

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
      const data = await api.loggedIn(localStorage.getItem('token'));
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
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
