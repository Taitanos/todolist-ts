import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import AppWithReducer from './AppWithReducer';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import { store } from './state/store';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
