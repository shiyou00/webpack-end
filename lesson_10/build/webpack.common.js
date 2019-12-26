const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'async', // async：做代码分割的时候只对异步代码生效，all: 同步异步都做分割
      minSize: 30000, // 文件最小打包尺码
      maxSize: 500000, // 最大打包尺寸，假设lodash为1MB，这里设置为500KB，webpack会尝试把lodash拆分成2个文件，但其实lodash这种类库是不好做拆分的，所以最终结果是一样的，只会打出一个包
      minChunks: 2, // 当一个模块被用了多少次才对它进行代码分割。
      maxAsyncRequests: 5, // 最多加载的chunk数量
      maxInitialRequests: 3, // 入口文件做代码分割的最大数量
      automaticNameDelimiter: '~', // 文件name的连接符
      name: true, // 是的cacheGroups中的filename生效
      cacheGroups: { // 这是一个缓存分组，下面vendors以及default则是相应的分组策略
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 对同步代码进行打包时，会先判断是否在node_modules下面
          priority: -10, // 打包一个模块有可能既符合vendors的规则也符合default的规则，这个时候根据priority的来判断选择哪个值越大优先级越高
          filename:'vendors.js' // 打包的名字
        },
        default: {
          minChunks: 2, // 当模块是 非node_modules的同步模块是，则会走这里的配置
          priority: -20, // 优先级
          reuseExistingChunk: true // 会去检查循环引用，避免打包一些无用的模块进来
        }
      }
    }
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
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath:"images",
            limit: 204800
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
