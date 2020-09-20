<template>
  <ul class="post-list">
    <li class="post-item" v-for="(item,index) in postList" :key="index">
      <div class="item-title">
        <router-link :to="'/article/' + item.name">
          <h3 class="post-title">{{item.name}}</h3>
        </router-link>
        <span class="post-author"> — {{item.author}}</span>
      </div>
      <p class="post-description">{{item.description}}</p>
      <div class="post-info">
        <span class="post-category">类别：<router-link :to="'/article?category=' + item.category">{{item.category}}</router-link></span>
        <span class="post-date">{{item.date | dateFormat}}</span>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    postList: {
      type: Array,
      default() {
        return []
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.post-list {
  list-style: none;
  .post-item {
    margin-top: 35px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--light-color);
    .item-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .post-title {
        font-size: 24px;
        color: var(--secondary-color);
        &:hover {
          color: var(--main-color);
        }
      }
      .post-author {
        color: var(--secondary-color);
      }
    }
    .post-description {
      line-height: 22px;
      color: var(--light-color);
    }
    .post-info {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      color: var(--secondary-color);
      .post-category {
        a {
          font-weight: 600;
          font-size: 16px;
          color: var(--secondary-color);
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>