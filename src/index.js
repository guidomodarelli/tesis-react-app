import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import './assets/styles/index.css';
import reducers from './redux/reducers';
import App from './routes/App';

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, // son todos los reducers
  {}, // estado inicial
  composedEnhancer(applyMiddleware(reduxThunk)),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
