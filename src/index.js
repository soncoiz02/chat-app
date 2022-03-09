import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import { Provider } from 'react-redux'
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
  ,
  document.getElementById('root')
);

