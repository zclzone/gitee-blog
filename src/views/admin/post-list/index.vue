<template>
  <div class="view">
    <div class="btns">
      <el-button @click="add" icon="el-icon-plus" plain type="primary">新增</el-button>
      <el-button @click="view" icon="el-icon-view" plain type="success">查看</el-button>
      <el-button @click="edit" icon="el-icon-edit" plain type="info">编辑</el-button>
      <el-button @click="remove" icon="el-icon-remove" plain type="danger">删除</el-button>
    </div>

    <el-table
      :data="postList"
      @current-change="handleCurrentChange"
      border
      height="100% - 40"
      highlight-current-row
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column
        :key="index"
        :label="item.title"
        :prop="item.prop"
        v-for="(item, index) in columns"
      >
        <template slot-scope="scope">
          <span v-if="item.prop === 'createDate'">
            {{
            scope.row[item.prop] | dateFormat
            }}
          </span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalCount"
      @current-change="handlePageChange"
      @next-click="handleNext"
      @prev-click="handlePrev"
      background
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      columns: [
        {
          title: '标题',
          prop: 'title',
          width: 120,
        },
        {
          title: '简介',
          prop: 'description',
          width: 120,
        },
        {
          title: '分类',
          prop: 'category',
          width: 120,
        },
        {
          title: '作者',
          prop: 'author',
          width: 120,
        },
        {
          title: '创建日期',
          prop: 'createDate',
          width: 120,
        },
        {
          title: '是否推荐',
          prop: 'isRecommend',
          width: 120,
        },
        {
          title: '是否发布',
          prop: 'isPublish',
          width: 120,
        },
      ],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      currentId: null,
      loading: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentId = val && val.id
    },
    async getData() {
      this.loading = true
      const { data } = await this.$axios.get('/post')
      this.loading = false
      if (!data || !data.length) {
        this.postList = []
        this.$message.error('No data')
        return
      }
      this.postList = data
    },
    handlePrev() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    handleNext() {
      if (this.totalCount / this.pageSize > this.currentPage) {
        this.currentPage++
      }
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    add() {
      this.$router.push({
        path: `/admin/list/add`,
      })
    },
    view() {
      if (this.currentId) {
        this.$router.push({
          path: `/admin/list/view`,
          query: {
            id: this.currentId,
          },
        })
      }
    },
    edit() {
      if (this.currentId) {
        this.$router.push({
          path: `/admin/list/edit`,
          query: {
            id: this.currentId,
          },
        })
      }
    },
    async remove() {
      if (!this.currentId) return
      if (!confirm('确定删除？')) return
      await this.$axios.delete(`/post/${this.currentId}`)
      this.getData()
    },
  },
}
</script>

<style lang="scss" scoped>
.view {
  height: calc(100% - 20px);
  padding-bottom: 40px;
  position: relative;

  .btns {
    text-align: left;
    height: 50px;
    line-height: 50px;

    .el-button {
      padding: 5px;
    }
  }

  .el-table {
    height: calc(100% - 50px);
  }

  .el-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>