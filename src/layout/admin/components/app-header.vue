<template>
  <div class="header-container">
    <div class="logo">
      <router-link to="/">
        <h2>{{title}}Admin</h2>
      </router-link>
    </div>
    <div class="info">
      <el-dropdown @command="handleCommand" trigger="click">
        <img :src="avatar_url" class="avatar">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span class="name">{{name}}</span>

    </div>
  </div>
</template>

<script>
const { siteOptions } = require('@/settings')

import { removeToken } from '@/utils/cookie-util'
import { getUser } from '@/utils/cookie-util'

export default {
  created() {
    const userJson = getUser()
    if (userJson) {
      const { name, avatar_url } = JSON.parse(userJson)
      this.avatar_url = avatar_url
    }
  },
  data() {
    return {
      avatar_url: 'https://avatars2.githubusercontent.com/u/49337591?s=60&v=4',
      name: siteOptions.author,
      title: siteOptions.title
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          removeToken()
          this.$router.replace({
            path: '/redirect?from=admin'
          })
          break
        default:
      }
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  .logo {
    h2 {
      margin: 0;
      padding: 0;
      color: var(--front-color);
    }
  }
  .info {
    height: 100%;
    .avatar {
      height: 30px;
      width: 30px;
      vertical-align: middle;
      margin-right: 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .name {
      color: #000;
      margin-right: 20px;
      &:hover {
        color: var(--front-color);
      }
    }
  }
}
</style>