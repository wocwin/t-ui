const path = require('path')
const port = 2222
const isProduction = process.env.NODE_ENV === 'production'
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  transpileDependencies: ['element-ui'], // 解决IE浏览器本地启动白屏现象
  // outputDir: process.env.outputDir || 'dist', // 输出文件名称
  // publicPath: '/',//部署应用包时的基本 URL
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
  // 强制内联CSS
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './examples')
        // 'vue$': path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm.js')
      }
    }
  },
  // 底层是webpack-chain packages
  chainWebpack: config => {
    // 配置兼容IE浏览器
    // config.entry.app = ['babel-polyfill', './src/main.js']
    // 配置别名
    // config.resolve.alias
    //   .set('@', resolve('examples'))
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
