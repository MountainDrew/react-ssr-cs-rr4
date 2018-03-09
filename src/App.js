import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import path from 'path';

import { Route, Switch } from 'react-router';

const getPage = (name) => Loadable({
  loader: () => import(`./pages/${name}`),
  loading: Loading
});

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={getPage('Home')} />
      <Route exact path="/about" component={getPage('About')} />
      <Route component={getPage('NotFound')} />
    </Switch>
  );
}
