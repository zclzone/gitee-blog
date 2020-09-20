<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in breadItems" :to="item.path" :key="index">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    breadItems: {
      type: Array,
      default: []
    }
  },
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 30px;
}
</style>