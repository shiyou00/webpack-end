const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 出口文件
    path: path.resolve(__dirname, 'dist') // 出口路径
  }
};
