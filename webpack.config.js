// webpack.config.js 是 webpack 的打包配置文件
// 它会自动来读取该文件中的配置项来打包
// 由于 webpack 本身是基于 Node 开发的，所以这个配置文件中我们可以使用 Node.js 代码

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: { // 可选的，默认打包到 dist/main.js 中
    path: path.join(__dirname, './dist/'), // 指定打包的结果存储目录（必须是绝对路径）
    filename: 'main.js' // 指定打包的结果文件名称
  },
  resolve: {
    // 配置可以省略的后缀名
    extensions: ['.js', '.json', '.css', '.vue']
  },
  // production 生产模式，会对代码进行优化压缩
  // development 开发模式，不会进行优化压缩
  // 优化压缩比较耗时，所以建议在开发过程中使用 development 模式，上线部署的使用开启 production 模式打包
  mode: 'development',
  devtool: 'inline-source-map', // 增加源码地图导航
  plugins: [
    // 每次打包之前先把 dist 目录清除，这样就能保证每次打包的结果都是干干净净的
    new CleanWebpackPlugin(['dist']),
    // 把 index.html 打包到结果目录中
    // title 可以用来指定 index.html 的 title
    // 它还可以把结果 JavaScript 文件自动引入 index.html 文件中
    // 这个插件还可以用来压缩 HTML 等作用
    // 参考文档：https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  // webpack-dev-server 的配置
  // webpack-dev-server 会把打包结果存储到内存中（目的是为了提高打包速度）
  devServer: {
    contentBase: './dist', // 指定指定 Web 容器的 www 目录
    hot: true
  },
  module: {
    rules: [{ // 这里用来配置打包规则
      // yarn add -D css-loader style-loader
      // 当 test 匹配到已 .css 结尾的资源的时候， use 使用 css-loader 和 style-loader 去加载处理
      // css-loader 的作用是把 css 代码转换为一个 JavaScript 模块
      // style-loader 的作用是负责把 JavaScript 模块生成一个 style 节点插入页面的 head 头部
      // 注意：老外的思维都是反的，写的时候顺序很重要 
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      // 安装：yarn add -D less less-loader
      // 当匹配到以 .less 结尾的资源的时候，使用 less-loader 打包处理
      // 注意：less-load 依赖 less
      // less-loader 只能把 less 转成 css
      // 如果需要在网页中能看到，还需要配置 style-loader、css-loader
      test: /\.less$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    }, {
      // 当匹配到以 /\.(png|svg|jpg|gif)$/ 结尾的文件的时候，使用 url-loader 来处理
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 3145728
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      // 当加载以 .js 结尾的文件的时候使用 babel-loader 来解析处理
      // babel-loader 会把 ECMAScript 6 转为 ECMAScript 5
      // exclude 表示排除不打包
      // npm install --save-dev babel-loader babel-core babel-preset-env
      // options 中的 presets 用来指定按照哪个规范来打包
      //    因为 ECMAScript 6 也有很多版本
      //    babel-preset-env 包含了好多个 ECMAScript 6 不同阶段的版本
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'stage-2']
          }
        },
        // 1. yarn add -D eslint eslint-loader
        // 2. 初始化 eslint 配置：./node_modules/.bin/eslint --init
        // 3. 配置下面的打包规则
        {
          loader: 'eslint-loader'
        }
      ]
    }, {
      // 1. yarn add -D vue-loader vue-template-compiler
      // 2. 配置 module 中的 rules 打包规则
      // 3. 配置 VueLoaderPlugin 到 plugins 中
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  }
}
