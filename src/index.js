import foo from './foo'

// webpack 本身只支持打包 JavaScript 模块
// 如果想让它打包加载其他资源
//    css
//    img
//    less
//    sass
//    。。。。
// 需要使用特定 loader（加载器） 才可以
import './css/main.css'
import './less/main.less'

foo()
