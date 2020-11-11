import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import './styles/App.css';
import Home from '../pages/Home';
import UserNew from '../pages/UserNew';
import Login from '../pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={UserNew} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
