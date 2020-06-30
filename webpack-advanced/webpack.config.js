const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'initial', // async：做代码分割的时候只对异步代码生效，all: 同步异步都做分割
      minSize: 3000, // 文件最小打包尺码
      maxSize: 0, // 最大打包尺寸，假设lodash为1MB，这里设置为500KB，webpack会尝试把lodash拆分成2个文件，但其实lodash这种类库是不好做拆分的，所以最终结果是一样的，只会打出一个包
      minChunks: 1, // 当一个模块被用了多少次才对它进行代码分割。
      maxAsyncRequests: 6, // 最多加载的chunk数量
      maxInitialRequests: 4, // 入口文件做代码分割的最大数量
      automaticNameDelimiter: '~', // 文件name的连接符
      name: true, // 是的cacheGroups中的filename生效
      cacheGroups: { // 这是一个缓存分组，下面vendors以及default则是相应的分组策略
        vendors: {
          chunks: 'initial', // 该策略只针对同步模块
          test: /[\\/]node_modules[\\/]/, // 对同步代码进行打包时，会先判断是否在node_modules下面
          priority: -10, // 打包一个模块有可能既符合vendors的规则也符合default的规则，这个时候根据priority的来判断选择哪个值越大优先级越高
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        default: {
          minChunks: 2, // 当模块是 非node_modules的同步模块是，则会走这里的配置
          priority: -20, // 优先级
          reuseExistingChunk: true // 会去检查循环引用，避免打包一些无用的模块进来
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    contentBase: './dist', // 服务器启动根目录设置为dist
    open: true, // 自动打开浏览器
    port: 8081, // 配置服务启动端口，默认是8080
  },
  entry: { // 入口文件
    main:'./src/index.js'
  },
  output: { // 出口文件
    publicPath:"",
    filename: '[name].[contenthash].js',
    chunkFilename:'[name].[contenthash].js',
    path: path.resolve(__dirname,'dist')
  },
  module:{ // loader 配置
    rules:[
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/, // 正则匹配js文件
        exclude: /node_modules/, // 排除 node_modules 文件夹
        loader: "babel-loader", // 使用 babel-loader
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 使用模板文件
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    })
  ]
}
