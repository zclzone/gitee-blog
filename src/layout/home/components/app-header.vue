<template>
  <header class="header">
    <nav class="header-nav">
      <div class="nav-brand sm-hide">
        <router-link to="/">{{title}}</router-link>
      </div>
      <div class="nav-menu">
        <ul>
          <li
            v-for="(value,key) in navMenu"
            :key="key"
            :class="{'menu-item': true,'current': current == value}"
          >
            <a v-if="key.startsWith('http')" :href="key">{{value}}</a>
            <router-link v-else :to="key">{{value}}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
const { siteOptions } = require('@/settings')

export default {
  data() {
    return {
      title: siteOptions.title,
      navMenu: siteOptions.navMenu,
      current: '',
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ path }) {
        this.current = this.navMenu[path]
      },
    },
  },
}
</script>


<style lang="scss" scoped>
.header {
  width: 100%;
  min-width: 360px;
  background: var(--front-color);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid var(--light-color);
  .header-nav {
    width: 100%;
    max-width: 1170px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    .nav-brand {
      min-width: 220px;
      a {
        font-size: 28px;
        color: var(--main-color);
        font-weight: 600;
      }
    }
    .nav-menu {
      ul {
        list-style: none;
        font-size: 16px;
        display: flex;

        .menu-item {
          padding: 0 15px;
          position: relative;
          a {
            color: var(--secondary-color);
            font-weight: 600;
          }
          a:hover,
          &.current a {
            color: var(--main-color);
          }
          &.current::before {
            content: '';
            position: absolute;
            background: var(--main-color);
            width: 100%;
            height: 4px;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>