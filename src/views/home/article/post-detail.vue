<template>
  <div class="detail-container">
    <div class="post-container" v-if="post">
      <article class="post-content">
        <header class="post-header">
          <h1 class="post-title">{{post.title}}</h1>
        </header>
        <section class="markdown-body post-body" v-html="postHtml"></section>
      </article>
      <comment :title="post.title + '-' + post.id" />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment'
import { setPageTitle } from '@/utils/page-title-util'
import MarkdownIt from 'markdown-it'

export default {
  components: {
    Comment,
  },
  data() {
    return {
      id: this.$route.params.id,
      post: null,
      postHtml: '',
    }
  },
  mounted() {
    this.getPost()
    setPageTitle((this.post && this.post.title) || '')
  },
  methods: {
    async getPost() {
      this.$loading.show()
      const { data } = await this.$axios.get(`/post/${this.id}`)
      this.$loading.hide()
      this.post = data
      const md = new MarkdownIt()
      this.postHtml = md.render(this.post.content)
    },
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
        content: '';
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