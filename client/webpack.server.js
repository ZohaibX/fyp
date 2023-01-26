const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//! .babelrc file is a necessary file for this

module.exports = {
  // inform webpack that we are building a bundle
  // for node js, rather than the browser
  target: 'node',

  // Tell webpack , the route file of server side
  entry: './src/index.jsx',

  plugins: [new MiniCssExtractPlugin()],
  // tell webpack, where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css' , '.scss']
  },


  mode: 'development',

  // tell webpack, to apply babel on every file, it runs through
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader , "css-loader" ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  externals: [webpackNodeExternals()],
};