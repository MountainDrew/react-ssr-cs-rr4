import express from 'express';
import path from 'path';

import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderToString } from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from './App';

const stats = require(path.resolve('dist', 'react-loadable.json'));
const server = express();

server.use('/dist', express.static(path.resolve('dist')));

const routeMatching = /^(\/(\w+)?)+$/
server.get(routeMatching, (req, res) => {
  const modules = [];
  const context = {};

  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter location={req.path} context={context}>
        <App/>
      </StaticRouter>
    </Loadable.Capture>
  );

  if (context.url) {
    return res.redirect(301, context.url);
  }

  if (context.notFound) {
    res.status(404);

    //potentially render another static 404 route.
  }

  const bundles = getBundles(stats, modules);

  const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React Server side rendering/Code splitting/React Router 4</title>
        ${styles.map(style => {
          return `<link href="/dist/${style.file}" rel="stylesheet"/>`;
        }).join('\n')}
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/dist/vendor.js"></script>
        <script src="/dist/main.js"></script>
        ${scripts.map(script => {
          return `<script src="/dist/${script.file}"></script>`
        }).join('\n')}
        <script>window.main();</script>
      </body>
    </html>
  `);
});

Loadable.preloadAll().then(() => {
  server.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
}).catch(err => {
  console.log(err);
});
