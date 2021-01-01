<template>
  <div class="view">
    <el-tag
      :key="item.id"
      :color="randomColor()"
      v-for="item in categories"
      closable
      :disable-transitions="true"
      @close="handleClose(item.id)"
    >{{item.title}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Category</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      inputVisible: false,
      inputValue: '',
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
    }
  },
  async mounted() {
    await this.getCategory()
  },
  methods: {
    async getCategory() {
      const { data } = await this.$axios.get('/category')
      if (!data || !data.length) {
        this.$message.error('No data')
        return
      }
      this.categories = data
    },
    async handleClose(id) {
      if (!confirm('确定删除？')) return
      await this.$axios.delete(`category/${id}`)
      this.getCategory()
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm() {
      if (!this.inputValue) {
        this.inputVisible = false
        this.inputValue = ''
        return
      }
      const data = { title: this.inputValue }
      await this.$axios.post('category', data)
      this.inputVisible = false
      this.inputValue = ''
      this.getCategory()
    },
    randomColor() {
      return this.colors[Math.floor(Math.random() * 10)]
    },
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