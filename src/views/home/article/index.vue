<template>
  <div class="article-container">
    <banner :bannerData="bannerData" />
    <section class="content-container">
      <el-row :gutter="25">
        <el-col :sm="18">
          <primary :postList="postList" :headerTitle="headerTitle" />
        </el-col>
        <el-col :sm="6" class="sm-hide">
          <secondary :postListData="postListData" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import Primary from './components/index-primary'
import Secondary from './components/index-secondary'

import { setPageTitle } from '@/utils/page-title-util'

import { giteeApi } from '@/utils/gitee-api'

const { siteOptions } = require('@/settings.js')

export default {
  data() {
    return {
      bannerData: {
        title: siteOptions.title.split('').join(' '),
        description: siteOptions.subtitle,
      },
      postListData: [],
      postList: [],
      headerTitle: '',
    }
  },
  async mounted() {
    this.$loading.show()
    const file = await giteeApi.getFile(`db/_post/postList.json`)
    this.$loading.hide()
    if (!file) {
      this.$message.error('No data')
      return
    }
    this.postListData = JSON.parse(file.content).content.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    this.filterPostList()
  },
  components: {
    Banner,
    Primary,
    Secondary,
  },
  methods: {
    filterPostList() {
      const { category, keyword } = this.$route.query
      if (category) {
        this.headerTitle = `类别：<i>"${category}"</i>`
        setPageTitle(`类别 | ${category}`)
        return (this.postList = this.postListData.filter(
          (item) => item.category === category
        ))
      }
      if (keyword) {
        this.headerTitle = `<i>"${keyword}" </i>的搜索结果`
        setPageTitle(`搜索结果 | ${keyword}`)
        return (this.postList = this.postListData.filter((post) => {
          return [post.author, post.name, post.category, post.description].some(
            (item) => {
              return item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            }
          )
        }))
      }
      this.headerTitle = '所有文章'
      this.postList = this.postListData
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler({ category, keyword }) {
        this.filterPostList()
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.article-container {
  width: 100%;
  min-height: 100%;
  background: var(--bg-color);
  padding-bottom: 25px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .content-container {
    width: 100%;
    max-width: 1170px;
    margin: 25px auto 0;
  }
}
</style>