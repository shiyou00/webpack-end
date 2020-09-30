const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfig = require('../../webpack-advanced/webpack.config');
const webpack = require("webpack");

module.exports = {
  entry: {
    index: './src/index.js'
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors:{
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  performance: false, // 不提示性能上的问题，例如包过大的警告
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $:"jquery",
      _:"loadsh"
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist')
  }
};
