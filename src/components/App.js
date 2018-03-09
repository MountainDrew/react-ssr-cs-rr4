import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import path from 'path';

import { Route, Switch } from 'react-router';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});
const About = Loadable({
  loader: () => import('./About'),
  loading: Loading,
});
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
});

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}
