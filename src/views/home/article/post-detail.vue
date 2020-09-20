<template>
  <div class="detail-container">
    <div class="post-container">
      <article class="post-content">
        <header class="post-header">
          <h1 class="post-title">{{name}}</h1>
        </header>
        <section class="markdown-body post-body" v-html="postHtml"></section>
      </article>
      <comment :title="name" />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment'
import { setPageTitle } from '@/utils/page-title-util'

import { giteeApi } from '@/utils/gitee-api'
import { getToken } from '@/utils/cookie-util'

export default {
  components: {
    Comment,
  },
  data() {
    return {
      name: this.$route.params.name,
      postHtml: '',
    }
  },
  async mounted() {
    if (this.name) {
      setPageTitle(this.name)
      this.getPostHtml()
    }
  },
  methods: {
    async getPostHtml() {
      let postContent = ''
      if (getToken()) {
        const file = await giteeApi.getFile(`db/_post/list/${this.name}.md`)
        if (!file) {
          return this.postHtml = '请求失败'
        }
        postContent = file.content
      } else {
        const [err, res] = await this.$to(this.$axios.get(`./db/_post/list/${this.name}.md`))
        if (err) {
          return this.postHtml = '请求失败'
        }
        postContent = res.data
      }

      // let [err, res] = await this.$to(this.$axios.get(`./db/_post/list/${this.name}.md`))
      // if (err) {
      //   return this.postHtml = '请求失败'
      // }
      const [err, res] = await this.$to(this.$axios.post('https://gitee.com/api/v5/markdown', { text: postContent }))
      if (err) {
        return this.postHtml = '解析失败'
      }
      this.postHtml = res.data
    }
  },
}
</script>

<style lang="scss" scoped>
.detail-container {
  width: 100%;
  min-height: 100%;
  background: var(--bg-color);
  padding: 20px 0;
  .post-container {
    width: 100%;
    max-width: 1170px;
    background: var(--front-color);
    margin: 0 auto;
    .post-content {
      padding: 50px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 5px;
        height: 80px;
        background: var(--main-color);
      }
      .post-header {
        margin-bottom: 30px;
        text-align: center;
        .post-title {
          font-size: 30px;
          color: var(--main-color);
          padding-bottom: 20px;
          border-bottom: 1px solid var(--light-color);
        }
      }
    }
  }
}
</style>