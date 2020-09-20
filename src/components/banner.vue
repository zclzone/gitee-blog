<template>
  <div class="banner">
    <div class="banner-content">
      <router-link to="/">
        <h1 class="title">{{bannerData.title}}</h1>
        <h2 class="description">{{bannerData.description}}</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerData: {
      type: Object,
      default() {
        return {
          title: '奇 思 笔 记',
          description: '孤光自照，肝胆皆冰雪'
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100px;
  background: var(--main-color);
  .banner-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
      color: var(--front-color);
      text-align: center;
      .title {
        padding-bottom: 5px;
        font-size: 35px;
        border-bottom: 2px solid var(--front-color);
      }
      .description {
        font-weight: 300;
        padding-top: 5px;
        font-size: 20px;
      }
    }
  }
}
</style>