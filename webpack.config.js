const webpack = require('webpack');
const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const uglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom/BrowserRouter',
      'react-loadable'
    ],
    main: './src/client',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["env", "react", "stage-2"],
            "plugins": [
              "transform-class-properties"
            ],
            babelrc: false
          }
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    NODE_ENV === 'production' ? new uglifyJSPlugin() : _ => null,
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'dist', 'react-loadable.json'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
  ]
};
