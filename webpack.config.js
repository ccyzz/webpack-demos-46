// webpack.config.js 是 webpack 的打包配置文件
// 它会自动来读取该文件中的配置项来打包
// 由于 webpack 本身是基于 Node 开发的，所以这个配置文件中我们可以使用 Node.js 代码

const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist/'), // 指定打包的结果存储目录（必须是绝对路径）
    filename: 'bundle.js' // 指定打包的结果文件名称
  },
  module: {
    rules: [{ // 这里用来配置打包规则
      // 当 test 匹配到已 .css 结尾的资源的时候， use 使用 css-loader 和 style-loader 去加载处理
      // css-loader 的作用是把 css 代码转换为一个 JavaScript 模块
      // style-loader 的作用是负责把 JavaScript 模块生成一个 style 节点插入页面的 head 头部
      // 注意：老外的思维都是反的，写的时候顺序很重要 
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
}
