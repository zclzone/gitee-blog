<template>
  <article class="primary">
    <header class="primary-header">
      <h1 class="header-title" v-html="headerTitle" />
    </header>
    <section class="content">
      <postList :postList="postList" />
    </section>
  </article>
</template>

<script>
import PostList from './post-list'
export default {
  props: {
    postList: {
      type: Array,
      default() {
        return []
      },
    },
    headerTitle: {
      type: String,
      default: '所有文章',
    },
  },
  components: {
    PostList,
  },
}
</script>

<style lang="scss" scoped>
.primary {
  background: var(--front-color);
  border-radius: 5px;
  padding-bottom: 40px;
  .primary-header {
    line-height: 50px;
  }
  .header-title {
    padding: 30px 0;
    text-align: center;
    font-size: 30px;
    position: relative;
    color: var(--main-color);
    &::after {
      content: '';
      position: absolute;
      width: 80%;
      height: 2px;
      background: var(--secondary-color);
      left: 10%;
      bottom: 0;
    }
  }
  .content {
    width: 80%;
    margin: 20px auto;
  }
}
</style>