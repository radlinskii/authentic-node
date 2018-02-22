const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
