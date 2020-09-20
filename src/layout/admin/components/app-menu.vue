<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#EBF0F2" @open="handleOpen" @close="handleClose" @select="select" :collapse="isCollapse">
    <el-submenu v-for="(route,index) in routes" :key="index" :index="route.path">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{route.meta && route.meta.title}}</span>
      </template>
      <el-menu-item-group v-for="item in route.children" :key="item.path">
        <el-menu-item :index="`${route.path}/${item.path}`">
          {{item.meta && item.meta.title}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>

export default {
  data() {
    return {
      isCollapse: false,
      isOpen: true
    };
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    filterRoutes(routes) {
      let routeList = []
      for (const route of routes) {
        if (!route.hidden) {
          let tmp = {
            path: route.path,
            meta: { ...route.meta }
          }
          if (route.children) {
            tmp.children = this.filterRoutes(route.children)
          }
          routeList.push(tmp)
        }
      }
      return routeList
    },
    select(index) {
      this.$router.replace({
        path: '/redirect?from=' + index
      })
    }
  },
  computed: {
    routes() {
      return this.filterRoutes(this.$router.options.routes)
    },
  }

}
</script>

<style lang="scss" scoped>
.el-aside {
  margin: 0;
  padding: 5px 5px 0;
  background: #e6edef;
  height: calc(100vh - 40px);
  width: 100%;
  .el-menu {
    width: 100%;
    overflow: auto;
    border-top: 1px solid #bbd0d6;
    border-left: 1px solid #bbd0d6;
    border-right: 1px solid #bbd0d6;
    min-height: calc(100vh - 45px);
    .el-menu-item {
      min-width: 188px !important;
      &.is-active {
        font-weight: 600;
        color: #4f9ffe;
      }
      &:hover {
        background: #ebf0f2 !important;
        font-weight: 600;
        color: #4f9ffe;
        &::after {
          content: "";
          position: absolute;
          height: 100%;
          width: 4px;
          left: 0px;
          top: 0;
          background: #4f9ffe;
        }
      }
    }
  }
}
</style>