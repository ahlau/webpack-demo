const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.devServer = function(options){
  return {
    devServer: {
      // enable history API fallback so HTML5 History API based routing works
      historyApiFallback: true,

      // Unlike the CLI flag, this doesn't set HotMuduleReplacementPlugin
      hot: true,
      inline: true,

      // Display errors only to reduce output
      stats: 'errors-only',

      // Parse host and port from env to allow customization
      // 0.0.0.0 is available to all network devices unlike localhost
      host: options.host, // defaults to localhost
      port: options.port // defaults to 8080
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        // enables multi-pass complilation for enhanced performance in larger
        // projects, good default.
        multiStep: true
      })
    ],
  };
};

exports.setupCSS = function(path) {
  return {
    module: {
      loaders: [
        {
          "test": /\.css$/,
          "loaders": ['style', 'css'],
          "include": path
        }
      ]
    }
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env= {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return{
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths){
  return {
    module: {
      loaders: [
        // extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths
      }),
    ]
  }
}

