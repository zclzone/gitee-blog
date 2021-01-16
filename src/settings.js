module.exports = {
  // 页面title
  title: '奇思笔记',
  // 发布pages的仓库名（博客部署文件存放的仓库名）
  pagesRepo: 'blog',
  // 网站配置信息
  siteOptions: {
    title: '奇思笔记',
    subtitle: '孤光自照，肝胆皆冰雪',
    author: '张传龙',
    description: '前端全栈开发者',
    github: 'https://github.com/zclzone/blog',
    navMenu: {
      'http://www.qszone.com': '首页', //外链
      '/article': '文章',
      'https://coolshell.cn': '友情链接',
      // '/works': '作品',
      'http://me.qszone.com': '关于我'
    },
    skills: ['Vue', 'React', 'JavaScript', 'Css', 'Java', 'C#', 'MySql', 'Sql Server', 'MongoDB'],
  },
  // 评论配置信息
  commentOptions: {
    owner: 'zclzone',
    repo: 'blog',
    clientId: '13f12c4d3203ceee7d22',
    clientSecret: '4de1abe7fa4d21bc1c76b6e03a86f0cc2d4afc83'
  },
  // gitee oauth
  giteeOauthOptions: {
    baseOauthUrl: 'https://gitee.com/oauth',
    clientId: '5469618e0b5d3fb058336b82c907bc9459f3c727ad1eb060325a803d91209a52',
    clientSecret: 'cb90ca23bd37be8d8a1aa53551db8cef4a5b148babef6aa78f3ad58e778c0abd',
    redirectUri: 'https://zclzone.gitee.io/redirect'
  },
  // gitee api
  giteeApiOptions: {
    baseApiURL: 'https://gitee.com/api/v5',
    owner: 'zclzone',
    repo: 'gitee-db'
  }
}