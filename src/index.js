import React from 'react';
import {render,} from 'react-dom';
import App from './components/App';
import configureStore from './store/configureStore';
import { Provider,} from 'react-redux';
import styles from './style.css'; //eslint-disable-line no-unused-vars
import {loadToDos,} from './actions/ToDoActions';
import {loadUser,} from './actions/UserActions';

const store = configureStore();
store.dispatch(loadToDos());
store.dispatch(loadUser());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
