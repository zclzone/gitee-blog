<template>
  <div class="view">
    <el-tag :key="index" :color="randomColor()" v-for="(item,index) in category.data" closable :disable-transitions="true" @close="handleClose(item)">
      {{item}}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Category</el-button>
  </div>
</template>

<script>
import { giteeApi } from '@/utils/gitee-api'

export default {
  data() {
    return {
      category: {},
      inputVisible: false,
      inputValue: '',
      colors: ['#005387', '#8cb811', '#fdb813', '#88aca1', '#788cb6', '#a1a1a4', '#ced7df', '#decba5', '#566127', '#76daff']
    }
  },
  async mounted() {
    await this.getCategory()
  },
  methods: {
    async getCategory() {
      const file = await giteeApi.getFile('db/_post/category.json')
      if (!file) {
        this.$message.error('No data')
        return
      }
      this.category = JSON.parse(file.content)
      this.category.name = file.name
      this.category.path = file.path
      this.category.sha = file.sha
    },
    async updateCategory() {
      const res = await giteeApi.updateFile(this.category.path, this.category.sha, JSON.stringify(this.category))
      if (res.status !== 'OK') {
        this.$message.error(res.msg)
        return
      }
      this.$message(res.msg)
      this.getCategory()
    },
    handleClose(name) {
      if (!confirm('确定删除？')) return
      this.category.data = this.category.data.filter(item => {
        return item != name
      })
      this.updateCategory()
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      if (!this.inputValue) {
        this.inputVisible = false
        this.inputValue = ''
        return
      }
      this.category.data.push(this.inputValue)
      this.inputVisible = false
      this.inputValue = ''
      this.updateCategory()
    },
    randomColor() {
      return this.colors[Math.floor(Math.random() * 10)]
    }
  },
}
</script>

<style lang="scss" scoped>
.view {
  margin-top: 50px;
  margin-left: 50px;
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>