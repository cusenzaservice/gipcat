import React from 'react';
import ReactDOM from 'react-dom';
import './react-content/css/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <h1>REACT OK!</h1>
  </React.StrictMode>,
  document.getElementById('root')
);
//serviceWorkerRegistration.register();
serviceWorkerRegistration.unregister();