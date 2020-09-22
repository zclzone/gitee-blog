<template>
  <div class="home">
    <app-header />
    <app-main />
  </div>
</template>

<script>
import { giteeApi } from '@/utils/gitee-api'

import AppHeader from './components/app-header'
import AppMain from './components/app-main'

export default {
  async beforeRouteEnter (to, from, next) {
    const hasRepo = await giteeApi.checkRepo()
    if (!hasRepo) {
      next('/admin')
    }
    next()
  },
  components: {
    AppHeader,
    AppMain
  },
}
</script>

<style>
.home {
  height: 100%;
}
</style>