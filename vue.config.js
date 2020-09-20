const settings = require('./src/settings.js')
const title = settings.title || '奇思笔记'

module.exports = {
  // publicPath: './',
  publicPath: process.env.NODE_ENV === 'production' ? `/${settings.publicRepo}/` : './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  }
}
