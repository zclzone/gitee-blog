<template>
  <div class="home">
    <app-header />
    <app-main />
  </div>
</template>

<script>
import AppHeader from './components/app-header'
import AppMain from './components/app-main'

export default {
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