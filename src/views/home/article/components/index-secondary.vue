<template>
  <article class="secondary">
    <section class="post-search">
      <div class="search">
        <input type="text" v-model="keyword" placeholder="输入关键字" @keyup.enter="search" />
        <button class="btn-search el-icon-search" @click="search"></button>
      </div>
      <el-divider>分类</el-divider>
      <div class="search-category">
        <router-link
          class="category-link"
          :to="'/article?category=' + key"
          :key="key"
          v-for="(value,key) in categories"
        >{{key}}</router-link>
      </div>
    </section>
    <section class="about-author">
      <div class="author-avatar">
        <a href="https://github.com/zclzone" target="_blank">
          <img src="@/assets/images/author.jpg" alt />
        </a>
      </div>

      <h2 class="author-name">{{author}}</h2>
      <p class="author-introduction">[ {{description}} ]</p>

      <div class="skills">
        <el-tag :key="index" v-for="(item,index) in skills" :color="randomColor()">{{item}}</el-tag>
      </div>

      <el-divider>
        Star Me
        <br />Contact Me
      </el-divider>

      <div class="contact-me">
        <el-tooltip effect="light" content="github" placement="bottom">
          <a :href="github">
            <i class="myIcon myIcon-github"></i>
          </a>
        </el-tooltip>
        <a href="#" class="weixin">
          <i class="myIcon myIcon-weixin"></i>
          <img src="@/assets/images/weixin.jpg" alt class="weixin" />
        </a>
      </div>
    </section>
    <section class="post-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="最新文章" name="recent">
          <ul class="list">
            <router-link
              :to="'/article/' + item.name"
              class="list-item"
              v-for="(item,index) in recentList"
              :key="index"
            >
              <li>{{item.name}}</li>
            </router-link>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="推荐文章" name="recommend">
          <ul class="list">
            <router-link
              :to="'/article/' + item.name"
              class="list-item"
              v-for="(item,index) in recommendList"
              :key="index"
            >
              <li>{{item.name}}</li>
            </router-link>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </section>
  </article>
</template>

<script>
const { siteOptions } = require('@/settings.js')

export default {
  props: {
    postListData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      skills: siteOptions.skills,
      author: siteOptions.author,
      description: siteOptions.description,
      github: siteOptions.github,
      colors: [
        '#005387',
        '#8cb811',
        '#fdb813',
        '#88aca1',
        '#788cb6',
        '#a1a1a4',
        '#ced7df',
        '#decba5',
        '#566127',
        '#76daff',
      ],
      keyword: '',
      activeName: 'recent',
    }
  },
  methods: {
    randomColor() {
      return this.colors[Math.floor(Math.random() * 10)]
    },
    search() {
      if (this.keyword) {
        this.$router.push({
          path: '/article',
          query: { keyword: this.keyword },
        })
      } else {
        this.$router.push({ path: '/article' })
      }
    },
    handleClick(tab) {},
  },
  computed: {
    categories() {
      let categories = {}
      this.postListData.forEach((item) => {
        categories[item.category] = item.category
      })
      return categories
      // return this.postListData.map(item => {
      //   return item.category
      // })
    },
    recentList() {
      return this.postListData.slice(0, 10)
    },
    recommendList() {
      return this.postListData.filter((item) => !!item.isRecommend)
    },
  },
}
</script>

<style lang="scss" scoped>
.secondary {
  width: 100%;
  section {
    background: var(--front-color);
    margin-bottom: 25px;
    border-radius: 5px;
    padding: 16px;
  }
  .about-author {
    text-align: center;
    .author-avatar {
      img {
        max-width: 80px;
        max-height: 80px;
        border-radius: 50%;
        transition: all 0.8s;
        &:hover {
          transform: scale(1.08);
        }
      }
    }
    .author-name {
      color: var(--main-color);
      line-height: 35px;
    }
    .author-introduction {
      line-height: 30px;
      color: var(--secondary-color);
    }
    .el-divider {
      margin: 34px 0;
      .el-divider__text {
        color: var(--light-color);
      }
    }
    .contact-me {
      display: flex;
      height: 25px;
      line-height: 25px;
      justify-content: center;
      .myIcon {
        margin: 0 20px;
        font-size: 18px;
      }
      .weixin {
        position: relative;
        &:hover img {
          display: block;
        }
        img {
          width: 120px;
          display: none;
          position: absolute;
          left: 50%;
          margin-left: -60px;
          top: 25px;
          z-index: 999;
        }
      }
    }
  }
  .post-search {
    .search {
      height: 35px;
      line-height: 35px;
      position: relative;
      input {
        height: 100%;
        width: calc(100% - 28px);
        padding: 0 10px;
        color: var(--light-color);
        font-size: 14px;
        border: 1px solid var(--light-color);
        border-right: none;
        border-radius: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        &::-webkit-input-placeholder {
          color: var(--light-color);
        }
        &:focus {
          color: var(--secondary-color);
          &::-webkit-input-placeholder {
            color: var(--secondary-color);
          }
        }
      }
      .btn-search {
        position: absolute;
        width: 30px;
        height: 100%;
        top: 0;
        right: 0;
        border: none;
        color: var(--front-color);
        font-size: 18px;
        background: var(--main-color);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        outline: none;
        cursor: pointer;
      }
    }
    .el-divider {
      margin: 25px 0;
      .el-divider__text {
        color: var(--light-color);
      }
    }
    .search-category {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      background: var(--bg-color);
      border-radius: 5px;
      padding: 5px;
      .category-link {
        font-size: 14px;
        margin: 5px;
        color: var(--secondary-color);
        font-weight: 600;
        &:hover {
          text-decoration: underline;
          color: var(--main-color);
        }
      }
    }
  }
  .post-tab {
    a {
      color: var(--secondary-color);
      display: block;
      margin-bottom: 5px;
      :hover {
        color: var(--main-color);
        text-decoration: underline;
      }
    }
  }
}
</style>