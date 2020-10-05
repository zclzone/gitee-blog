const settings = require('./src/settings.js')
const title = settings.title || '启始博客'

module.exports = {
  // publicPath: './',
  publicPath: process.env.NODE_ENV === 'production' ? `/${settings.pagesRepo}/` : './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  }
}
