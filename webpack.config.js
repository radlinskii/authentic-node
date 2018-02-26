const path = require('path');
const webpack = require('webpack'); //eslint-disable-line no-unused-vars

module.exports = {
  entry: [
    './lib/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env','react',],
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader',],
        include: path.resolve(__dirname, 'lib'),
      },
    ],
  },
  stats: {
    colors: true,
  },
  /*plugins: [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }), new webpack.optimize.UglifyJsPlugin(),
  ],*/
};
