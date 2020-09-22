<template>
  <div class="view">
    <div class="btns">
      <el-button type="primary" icon="el-icon-plus" @click="add" plain>
        新增
      </el-button>
      <el-button type="success" icon="el-icon-view" @click="view" plain>
        查看
      </el-button>
      <el-button type="info" icon="el-icon-edit" @click="edit" plain>
        编辑
      </el-button>
      <el-button type="danger" icon="el-icon-remove" @click="remove" plain>
        删除
      </el-button>

    </div>

    <el-table :data="posts" v-loading="loading" border style="width: 100%" height="100% - 40" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column type="index" width="100" label="Seq"></el-table-column>
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.prop" :label="item.title">
        <template slot-scope="scope">
          <span v-if="item.prop === 'date'">{{scope.row[item.prop] | dateFormat}}</span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout=" prev, pager, next" :total="totalCount" :page-size="pageSize" :current-page="currentPage" @prev-click="handlePrev" @next-click="handleNext" @current-change="handlePageChange">
    </el-pagination>
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
        { title: 'name', prop: 'name', width: 120 },
        { title: 'description', prop: 'description', width: 120 },
        { title: 'category', prop: 'category', width: 120 },
        { title: 'author', prop: 'author', width: 120 },
        { title: 'path', prop: 'path', width: 120 },
        { title: 'date', prop: 'date', width: 120 }
      ],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      selectedFile: null,
      loading: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedFile = val.length && val[0] || null
    },
    handleCurrentChange(val) {
      this.selectedFile = val
    },
    async getData() {
      this.loading = true
      const file = await giteeApi.getFile(`db/_post/postList.json`)
      if (!file) {
        this.loading = false
        this.$message.error('No data')
        return
      }
      this.loading = false
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
      // this.getData(this.pageSize, this.currentPage)
    },
    add() {
      this.$router.push({ path: `/admin/list/add` })
    },
    view() {
      if (this.selectedFile) {
        this.$router.push({ path: `/admin/list/view`, query: { ...this.selectedFile } })
      }
    },
    edit() {
      if (this.selectedFile) {
        this.$router.push({ path: `/admin/list/edit`, query: { ...this.selectedFile } })
      }
    },
    async remove() {
      if (!this.selectedFile) return
      if (!confirm('确定删除？')) return
      let res = await giteeApi.removeFile(this.selectedFile.path)
      if (res.status !== 'OK') {
        this.$message.error(res.msg)
      }
      this.postList.content.data = this.postList.content.data.filter(item => {
        return item.path != this.selectedFile.path
      })

      res = await giteeApi.updateFile(this.postList.path, this.postList.sha, JSON.stringify(this.postList))
      if (res.status !== 'OK') {
        this.$message.error(res.msg)
      } else {
        this.$message(res.msg)
      }
      this.getData()
    }
  },
  computed: {
    posts() {
      let list = []
      if (this.postList.content) {
        const postArr = this.postList.content.data
        postArr.forEach(item => {
          list.push(item)
        })
      }
      return list
    }
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