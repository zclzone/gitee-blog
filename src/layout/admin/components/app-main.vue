<template>
  <div class="main-container">
    <bread-crumb :breadItems="breadItems" />
    <transition name="slide-fade"
                mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import BreadCrumb from '@/components/bread-crumb'

export default {
  components: {
    BreadCrumb
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(route => {
        return route.path !== '*' && route.path !== '/404' && route.path != '/'
      })
    },
    breadItems() {
      let pathes = this.$route.path.replace(/^\//, '').split('/')
      pathes.length -= 1
      let rootPath = ''
      let breadItems = []
      let $routes = this.routes
      for (const path of pathes) {
        for (let i = 0; i < $routes.length; i++) {
          if ($routes[i].path.replace(/^\//, '') == path) {
            breadItems.push({ path: `${rootPath}/${path}`, name: $routes[i].meta.title })
            if ($routes[i].children) {
              $routes = $routes[i].children
              rootPath += `/${path}`
            }
            break
          }
        }
      }
      breadItems.push({ path: this.$route.path, name: this.$route.meta.title })
      return breadItems
    }
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
}
</style>