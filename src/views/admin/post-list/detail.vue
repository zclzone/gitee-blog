<template>
  <div>
    <div class="btns">
      <router-link to="/admin/list" style="margin-right:10px;">
        <el-button type="info" icon="el-icon-close" plain>退出</el-button>
      </router-link>
      <el-button
        v-if="action == 'edit' || action == 'add'"
        type="primary"
        icon="el-icon-finished"
        plain
        @click="savePost"
      >保存</el-button>
    </div>
    <el-form ref="postForm" label-width="50px" label-position="left">
      <el-row class="form-row">
        <el-col :span="5">
          <el-form-item label="标题">
            <el-input v-model="post.title" placeholder="文章标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-form-item label="分类">
            <el-select v-model="post.category" placeholder="文章类型">
              <el-option
                :label="item.title"
                :value="item.title"
                v-for="item in categories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-form-item label="简介">
            <el-input v-model="post.description" placeholder="文章简介"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-form-item label="发布">
            <el-checkbox v-model="post.isPublish" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="推荐">
            <el-checkbox v-model="post.isRecommend" />
          </el-form-item>
        </el-col>
      </el-row>
      <mavon-editor v-model="post.content" ref="md" />
    </el-form>
  </div>
</template>

<script>
const { siteOptions } = require('@/settings')

export default {
  beforeRouteEnter(to, from, next) {
    switch (to.params.action) {
      case 'add':
        document.title = `${to.meta.title}-创建`
        break
      case 'edit':
        document.title = `${to.meta.title}-编辑`
        break
      default:
        document.title = `${to.meta.title}-查看`
    }
    next()
  },
  data() {
    return {
      action: this.$route.params.action,
      id: this.$route.query.id || '',
      post: {
        isPublish: false,
        isRecommend: false,
        author: siteOptions.author || '',
      },
      categories: [],
    }
  },
  mounted() {
    this.getPost(this.id)
    this.getCategory()
  },
  methods: {
    async getPost(id) {
      if (!id) return
      this.$loading.show()
      const { data } = await this.$axios.get(`/post/${id}`)
      this.$loading.hide()
      if (!data) {
        this.$message.error('No data')
        return
      }
      this.post = data
    },
    async getCategory() {
      this.$loading.show()
      const { data } = await this.$axios.get('/category')
      this.$loading.hide()
      this.categories = data
    },
    async savePost() {
      if (this.action == 'edit') {
        this.updatePost()
        return
      }
      this.$loading.show()
      await this.$axios.post('/post', this.post)
      this.$loading.hide()
      this.$message('Success')
      this.$router.push('/admin/list')
    },
    async updatePost() {
      this.$loading.show()
      this.post.author = siteOptions.author || ''
      await this.$axios.put(`/post/${this.id}`, this.post)
      this.$loading.hide()
      this.$message('Success')
      this.$router.push('/admin/list')
    },
  },
}
</script>


<style lang="scss" scoped>
.btns {
  font-size: 12px;
  padding-bottom: 20px;
  margin-bottom: 15px;
  margin-top: 5px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(69, 76, 82, 0.2);
  }
  button {
    padding: 8px 10px;
  }
}

.form-row {
  height: 60px;
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  .el-textarea__inner {
    resize: none;
  }
}

.markdown-body {
  height: calc(100vh - 245px);
}
</style>