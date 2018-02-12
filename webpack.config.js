'use strict'

const LiveReloadPlugin = require('webpack-livereload-plugin')
    , devMode = require('.').isDevelopment

/**
 * Fast source maps rebuild quickly during development, but only give a link
 * to the line where the error occurred. The stack trace will show the bundled
 * code, not the original code. Keep this on `false` for slower builds but
 * usable stack traces. Set to `true` if you want to speed up development.
 */
const path = require('path')
    , USE_FAST_SOURCE_MAPS = false

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: devMode && USE_FAST_SOURCE_MAPS
    ? 'cheap-module-eval-source-map'
    : 'source-map',
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx', '.json', '*', 'png, "jpg', "jpeg", "svg"]
  },
  module: {
        loaders: [
      {exclude: /(node_modules|bower_components)/, loader:  'babel-loader', test: /\.jsx?$/},
      {loader: 'style-loader!css-loader', test: /\.css$/},
      {loader: 'url-loader', test:  /\.(png|jp(e*)g|svg)$/},
      {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
    ],
  },
  plugins: devMode
    ? [new LiveReloadPlugin({appendScriptTag: true})]
    : []
}
