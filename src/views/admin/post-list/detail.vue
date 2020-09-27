<template>
  <div>
    <div class="btns">
      <router-link to='/admin/list' style="margin-right:10px;">
        <el-button type="info" icon="el-icon-close" plain>退出
        </el-button>
      </router-link>
      <el-button v-if="action == 'edit' || action == 'add'" type="primary" icon="el-icon-finished" plain @click="savePost">保存</el-button>
    </div>
    <el-form ref="postForm" label-width="50px" label-position="left">
      <el-row class="form-row">
        <el-col :span="5">
          <el-form-item label="标题">
            <el-input v-model="name" placeholder="文章标题" :disabled="action == 'edit'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item label="分类">
            <el-select v-model="category" placeholder="文章类型">
              <el-option :label="item" :value="item" v-for="item in categories" :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13" :offset="1">
          <el-form-item label="简介">
            <el-input v-model="description" placeholder="文章简介"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <mavon-editor v-model="post.content" ref=md />
    </el-form>
  </div>
</template>

<script>
const { siteOptions } = require('@/settings')

import { giteeApi } from '@/utils/gitee-api'

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
      path: this.$route.query.path,
      action: this.$route.params.action,
      post: {},
      postList: {},
      categories: [],
      name: this.$route.query.name,
      category: this.$route.query.category || '',
      description: this.$route.query.description || '',
      author: siteOptions.author || ''
    }
  },
  mounted() {
    this.getPost(this.path)
    this.getPostList()
    this.getCategory()
  },
  methods: {
    async getPost(path) {
      if (!path) return
      this.$loading.show()
      const file = await giteeApi.getFile(path)
      this.$loading.hide()
      if (!file) {
        this.$message.error('No data')
        return
      }
      this.post = file
    },
    async getPostList() {
      this.$loading.show()
      const file = await giteeApi.getFile(`db/_post/postList.json`)
      this.$loading.hide()
      if (!file) {
        this.$message.error('No data')
        return
      }
      this.postList = JSON.parse(file.content)
      this.postList.name = file.name
      this.postList.path = file.path
      this.postList.sha = file.sha
    },
    async getCategory() {
      this.$loading.show()
      const file = await giteeApi.getFile('db/_post/category.json')
      this.$loading.hide()
      if (!file) {
        this.$message.error('No data')
        return
      }
      this.categories = JSON.parse(file.content).data
    },
    async savePost() {
      if (this.action == 'edit') {
        this.updatePost()
        return
      }
      this.$loading.show()
      const res = await giteeApi.addFile(`db/_post/list/${this.name}.md`, this.post.content)
      if (res.status !== 'OK') {
        this.$loading.hide()
        this.$message.error(res.msg)
        return
      }
      this.postList.content.data.unshift({
        name: this.name,
        path: `db/_post/list/${this.name}.md`,
        description: this.description,
        category: this.category,
        author: this.author,
        cover: "",
        date: new Date()
      })
      const res2 = await giteeApi.updateFile(this.postList.path, this.postList.sha, JSON.stringify(this.postList))
      this.$loading.hide()
      if (res2.status !== 'OK') {
        this.$message.error(res2.msg)
        return
      }
      this.$message(res2.msg)
      this.$router.push('/admin/list')
    },
    async updatePost() {
      this.$loading.show()
      const res = await giteeApi.updateFile(`db/_post/list/${this.name}.md`, this.post.sha, this.post.content)
      if (res.status !== 'OK') {
        this.$loading.hide()
        this.$message.error(res.msg)
        return
      }

      this.postList.content.data = this.postList.content.data.map(item => {
        if (item.path == this.path) {
          return {
            ...item,
            name: this.name,
            description: this.description,
            category: this.category,
            cover: "",
          }
        }
        return item
      })
      const res2 = await giteeApi.updateFile(this.postList.path, this.postList.sha, JSON.stringify(this.postList))
      this.$loading.hide()
      if (res2.status !== 'OK') {
        this.$message.error(res2.msg)
        return
      }
      this.$message(res2.msg)
      this.$router.push('/admin/list')
    }
  }

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
    content: "";
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