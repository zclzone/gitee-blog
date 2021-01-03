<template>
  <div class="home">
    <app-header />
    <app-main />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from './components/app-header'
import AppMain from './components/app-main'
import AppFooter from './components/app-footer'

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
}
</script>

<style>
.home {
  min-height: 100%;
}
</style>