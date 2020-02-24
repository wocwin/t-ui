const port = 2222

module.exports = {
  // configureWebpack: (config) => {
  //   config.entry.app = ['babel-polyfill', './src/main.js']
  // },
  // outputDir: process.env.outputDir || 'dist', // 输出文件名称
  // publicPath: '/',//部署应用包时的基本 URL
  // productionSourceMap: isProduction ? false : true, // 解决vue项目打包后浏览器F12查看到项目源代码false不能看到
  productionSourceMap: true, // 测试调试打断点
  // lintOnSave: false,// 去掉eslint校验
  devServer: {
    port: port, // 设置端口号
    open: true, // 启动项目自动打开浏览器
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
  }
}
