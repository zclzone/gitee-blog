<template>
  <el-container>
    <el-header height="40px">
      <app-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <AppMenu />
      </el-aside>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken, setToken } from '@/utils/cookie-util'
import { getAccessToken, getOauthUrl, getUserInfo } from '@/utils/oauth-util'
import { giteeApi } from '@/utils/gitee-api'

import AppMenu from './components/app-menu'
import AppHeader from './components/app-header'
import AppMain from './components/app-main'
export default {
  async beforeRouteEnter(to, from, next) {
    const token = getToken()
    if (token) {
      //每次路由改变延长Cookie过期时间
      setToken(token)
      if (to.query.code) {
        delete to.query.code
        next({ ...to })
      } else {
        next()
      }
      return
    }
    if (to.query && to.query.code) {
      try {
        const access_token = await getAccessToken(to.query.code)
        await getUserInfo(access_token)
        delete to.query.code
        if (access_token) {
          setToken(access_token)
          next({ ...to })
        }
      } catch {
        location.hash = '/admin'
        window.name = location.href
        location.href = getOauthUrl()
      }
    } else {
      let hashPath = location.hash && location.hash.replace('#', '') || ''
      if (!hashPath.startsWith('/admin')) {
        location.hash = '/admin'
      }
      window.name = location.href
      location.href = getOauthUrl()
    }
  },
  components: {
    AppMenu,
    AppHeader,
    AppMain,
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  background: linear-gradient(to top right, #162948, #e6edef);
}
.el-aside {
  margin: 0;
  padding: 5px 5px 0;
  background: #e6edef;
  height: calc(100vh - 40px);
}
.el-main {
  margin: 0;
  height: calc(100vh - 40px);
  border-top: 5px solid #e6edef;
  border-right: 5px solid #e6edef;
}
</style>