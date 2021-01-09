<template>
  <footer class="footer" v-if="$route.path === '/' || $route.path === '/article'">
    <div class="footer-container">
      <el-row>
        <el-col :span="18">
          <p class="link">
            <a href="http://www.qszone.com" target="_blank">www.qszone.com</a>
          </p>
          <p class="link">
            <a href="http://beian.miit.gov.cn/" target="_blank">赣ICP备2020015008号-1</a>
          </p>
        </el-col>
      </el-row>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: var(--bg-color);
  width: 100%;
  padding-bottom: 15px;

  .footer-container {
    max-width: 1170px;
    margin: 0 auto !important;
  }
  .link {
    font-size: 16px;
    line-height: 35px;
    text-align: center;
    color: var(--light-color);
    a {
      margin: 0 5px;
      color: var(--light-color);
      &:hover {
        color: var(--main-color);
      }
    }
  }
}
</style>