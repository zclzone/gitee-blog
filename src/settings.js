module.exports = {
  title: '奇思笔记',
  publicRepo: 'gitee-blog',
  siteOptions: {
    title: '奇思笔记',
    subtitle: '孤光自照，肝胆皆冰雪',
    author: '张传龙',
    description: '痴迷于前端的全栈工程师',
    github: 'https://github.com/zclzone',
    navMenu: {
      '/index': '首页',
      '/article': '文章',
      '/works': '作品',
      '/article/关于本站': '关于本站'
    },
    skills: ['Vue', 'React', 'JavaScript', 'Css', 'Java', 'C#', 'MySql', 'Sql Server', 'MongoDB'],
  },
  commentOptions: {
    owner: 'zclzone',
    repo: 'gitee-blog-src',
    clientId: '13f12c4d3203ceee7d22',
    clientSecret: '4de1abe7fa4d21bc1c76b6e03a86f0cc2d4afc83'
  },
  giteeOauthOptions: {
    baseOauthUrl: 'https://gitee.com/oauth',
    clientId: '5469618e0b5d3fb058336b82c907bc9459f3c727ad1eb060325a803d91209a52',
    clientSecret: 'cb90ca23bd37be8d8a1aa53551db8cef4a5b148babef6aa78f3ad58e778c0abd',
    redirectUri: 'https://zclzone.gitee.io/redirect'
  },
  giteeApiOptions: {
    baseApiURL: 'https://gitee.com/api/v5',
    owner: 'zclzone',
    repo: 'gitee-blog'
  }
}