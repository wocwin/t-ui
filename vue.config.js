const path = require('path')
const port = 2222
const isProduction = process.env.NODE_ENV === 'production'
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  // transpileDependencies: ['element-ui'], // 解决IE浏览器本地启动白屏现象
  // outputDir: process.env.outputDir || 'dist', // 输出文件名称
  // publicPath: './', // 部署应用包时的基本 URL
  productionSourceMap: !isProduction, // 解决vue项目打包后浏览器F12查看到项目源代码false不能看到
  // productionSourceMap: true, // 测试调试打断点
  // lintOnSave: false,// 去掉eslint校验
  devServer: {
    port: port, // 设置端口号
    // open: true, // 启动项目自动打开浏览器
    proxy: { // 解决跨域问题
      '/api': {
        target: 'http://localhost:2222/', // 本地json数据
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/api': '/mock' // 本地
        }
      }
    }
  },
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // output: {
  //   filename: 'index.js',
  //   path: path.resolve(__dirname, './lib'),
  //   library: '@wocwin/t-ui', // 指定类库名,主要用于直接引用的方式
  //   libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
  // },
  // 强制内联CSS
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './examples'),
        '~': path.resolve(__dirname, './packages')
      }
    }
  },
  // 底层是webpack-chain packages
  chainWebpack: config => {
    // 配置兼容IE浏览器
    // config.entry.app = ['babel-polyfill', './src/main.js']
    // 配置别名
    // vue默认@指向src目录，这里要修正为examples，另外新增一个~指向packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))
    // lib目录是组件库最终打包好存放的地方，不需要eslint检查
    // examples/docs是存放md文档的地方，也不需要eslint检查
    // config.module
    //   .rule('eslint')
    //   .exclude.add(path.resolve('lib'))
    //   .end()
    // packages和examples目录需要加入编译
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .rule('js')
      .include.add('/packages/')
      .end()
      //   .include.add('/examples/')
      //   .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
        // maxSize: 100000 // 大于100kb做二次分割
      })
    }
  }
}
