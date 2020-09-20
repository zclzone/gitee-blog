<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <span class="el-dropdown-link">{{title}}
      <i class="el-icon-caret-bottom"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in langs" :class="{current:item.lang === $i18n.locale}" :key="item.lang" :command="item.lang">{{item.title}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { setLang } from '@/utils/cookie-util'
export default {
  props: {
    langs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: '请选择'
    }
  },
  methods: {
    handleCommand(command) {
      this.$i18n.locale = command || 'CN'
      setLang(command || 'CN')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  cursor: pointer;
  color: #000;
  &:hover {
    color: var(--front-color);
  }
}
.current {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>