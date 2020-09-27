import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入Element UI
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

// 引入mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import loading from '@/utils/loading'
Vue.use(loading)


// 引入样式
import '@/assets/styles/main.scss'
import 'github-markdown-css/github-markdown.css'


// 扩充Vue的全局prototype属性
import axios from '@/ajax/request'
import { to } from '@/utils/common'
Vue.prototype.$axios = axios
Vue.prototype.$to = to
Vue.prototype.guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

//全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
