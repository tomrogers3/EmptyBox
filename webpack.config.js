var path = require('path');
var webpack = require('webpack');
var blogPath = path.resolve(__dirname, 'blog');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var reactPath = path.resolve(node_modules_dir, 'react', 'dist');
var buildPath = path.resolve(__dirname, 'build');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 
    'webpack/hot/only-dev-server', 
    path.resolve(blogPath, '_main.jsx')
  ],
  context: blogPath,
  devtool: 'eval',
  output: {
    filename: 'blog.js',
    path: buildPath,
    publicPath: '/public/'
  },
  resolve: {
    alias: {
      'react/lib/ReactMount': path.resolve(node_modules_dir, 'react', 'lib', 'ReactMount'),
      'react/addons': path.resolve(reactPath, 'react-with-addons.min.js'),
      'react': path.resolve(reactPath, 'react.min.js')
    }
  },
  module: {
    noParse: [reactPath],
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'jsx'],
      exclude: [node_modules_dir]
    }, {
      test: /\.md$/,
      loader: 'raw'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()]
};

module.exports = config;