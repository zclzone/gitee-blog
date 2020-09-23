/**
 * 此文件已停用，main.js并未引用此文件
 */

import router from './index'
import { getToken, setToken } from '@/utils/cookie-util'
import { getAccessToken, getOauthUrl } from '@/utils/oauth-util'

const whiteList = ['/', '/index', '/index/article', '/index/works', '/index/about']

router.beforeEach(async (to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return
  }
  if (to.path === '/auth') {
    if (to.query && to.query.code) {
      const access_token = await getAccessToken(to.query.code)
      if (access_token) {
        setToken(access_token)
        next({ path: '/admin' })
      }
    }
  }
  const token = getToken()
  if (token) {
    //每次路由改变延长Cookie过期时间
    setToken(token)
    next()
  } else {
    location.hash = ''
    window.name = location.href
    location.href = getOauthUrl()
  }
})

router.afterEach(() => {
})
