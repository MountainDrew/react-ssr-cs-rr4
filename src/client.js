import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import App from './App';

import BrowserRouter from 'react-router-dom/BrowserRouter';

window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate((
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    ), document.querySelector('#app'));
  });
};
