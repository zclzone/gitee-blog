const settings = require('./src/settings.js')
const title = settings.title || '奇思笔记'

module.exports = {
  publicPath: '/',
  // publicPath: process.env.NODE_ENV === 'production' ? `/${settings.pagesRepo}/` : './',
  productionSourceMap: false, //生产环境不需要source map，将其设置为 false 以加速生产环境构建
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
      //打包文件大小配置
      config['performance'] = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  devServer: {
    // proxy: 'http://localhost:3000'
    // proxy: 'http://47.113.180.205:3000'
    proxy: 'http://blog.qszone.com/'
  }
}
