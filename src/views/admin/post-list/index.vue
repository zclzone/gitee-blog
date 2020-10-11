<template>
  <div class="view">
    <div class="btns">
      <el-button @click="add" icon="el-icon-plus" plain type="primary">新增</el-button>
      <el-button @click="view" icon="el-icon-view" plain type="success">查看</el-button>
      <el-button @click="edit" icon="el-icon-edit" plain type="info">编辑</el-button>
      <el-button @click="remove" icon="el-icon-remove" plain type="danger">删除</el-button>
    </div>

    <el-table
      :data="posts"
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
          <span v-if="item.prop === 'date'">
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
import { giteeApi } from '@/utils/gitee-api'
import axios from '@/ajax/request'

export default {
  data() {
    return {
      postList: {},
      columns: [
        {
          title: '标题',
          prop: 'name',
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
          title: '是否推荐',
          prop: 'isRecommend',
          width: 120,
        },
        {
          title: '路径',
          prop: 'path',
          width: 120,
        },
        {
          title: '发布日期',
          prop: 'date',
          width: 120,
        },
      ],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      selectedFile: null,
      loading: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedFile = (val.length && val[0]) || null
    },
    handleCurrentChange(val) {
      this.selectedFile = val
    },
    async getData() {
      this.loading = true
      const file = await giteeApi.getFile(`db/_post/postList.json`)
      this.loading = false
      if (!file) {
        this.$message.error('No data')
        return
      }
      this.postList = JSON.parse(file.content)
      this.postList.name = file.name
      this.postList.path = file.path
      this.postList.sha = file.sha
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
      if (this.selectedFile) {
        this.$router.push({
          path: `/admin/list/view`,
          query: {
            ...this.selectedFile,
          },
        })
      }
    },
    edit() {
      if (this.selectedFile) {
        this.$router.push({
          path: `/admin/list/edit`,
          query: {
            ...this.selectedFile,
          },
        })
      }
    },
    async remove() {
      if (!this.selectedFile) return
      if (!confirm('确定删除？')) return
      let res = await giteeApi.removeFile(this.selectedFile.path)
      if (res.status !== 'OK') {
        this.$message.error(res.msg)
      }
      this.postList.content.data = this.postList.content.data.filter((item) => {
        return item.path != this.selectedFile.path
      })
      this.$loading.show()
      res = await giteeApi.updateFile(
        this.postList.path,
        this.postList.sha,
        JSON.stringify(this.postList)
      )
      this.$loading.hide()
      if (res.status !== 'OK') {
        this.$message.error(res.msg)
      } else {
        this.$message(res.msg)
      }
      this.getData()
    },
  },
  computed: {
    posts() {
      let list = []
      if (this.postList.content) {
        const postArr = this.postList.content.data
        postArr.forEach((item) => {
          list.push(item)
        })
      }
      return list
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