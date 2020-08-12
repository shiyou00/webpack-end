const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 开发模式
  devtool: 'source-map',
  devServer: {
    contentBase: './dist', // 服务器启动根目录设置为dist
    open: true, // 自动打开浏览器
    port: 8081, // 配置服务启动端口，默认是8080
    hot: true // 开始热更新
  },
  entry: { // 入口文件
    main:'./src/index.ts'
  },
  output: { // 出口文件
    publicPath:"",
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module:{ // loader 配置
    rules:[
      {
        test:/\.tsx?$/,
        use:'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/, // 正则匹配js文件
        exclude: /node_modules/, // 排除 node_modules 文件夹
        loader: "babel-loader", // 使用 babel-loader
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
        test:/\.scss$/, // 正则匹配到.scss样式文件
        use:[
          'style-loader', // 把得到的CSS内容插入到HTML中
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // scss中再次import scss文件，也同样执行 sass-loader 和 postcss-loader
              modules: true // 启用 css module
            }
          },
          'sass-loader', // 解析 scss 文件成 css 文件
          'postcss-loader'// 自动增加厂商前缀 -webket -moz，使用它还需要创建postcss.config.js配置文件
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 打包字体文件
        use: ['file-loader'] // 把字体文件移动到dist目录下
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 使用模板文件
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin() // webpack内置的热更新插件
  ]
}
