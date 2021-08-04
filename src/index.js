import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import smoothscroll from 'smoothscroll-polyfill';
import { App } from './components/App/App.jsx'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

smoothscroll.polyfill();