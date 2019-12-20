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
    port: 8081,
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
      },
      {
        test:/\.css$/,
        use:[
          'style-loader', // 在得到生成的CSS内容插入到HTML中
          'css-loader'
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath:"images", // 打包该资源到 images 文件夹下
            limit: 204800 // 如果图片的大小，小于204800KB则时输出base64，否则输出图片
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 打包字体文件
        use: ['file-loader']
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
