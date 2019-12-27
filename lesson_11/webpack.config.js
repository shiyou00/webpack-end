const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js', // 入口文件
  devServer: {
    contentBase: './dist',
    open: true, // 自动打开浏览器
    port: 8088,
    hot: true
  },
  output: {
    filename: 'bundle.js', // 出口文件
    path: path.resolve(__dirname, 'dist') // 出口路径
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 使用模板文件
    }),
    new CleanWebpackPlugin(), // 使用这个插件在每次生成dist目录前，先删除dist目录
    new webpack.HotModuleReplacementPlugin()
  ]
};
