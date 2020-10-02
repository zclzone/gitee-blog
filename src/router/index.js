import Vue from 'vue'
import VueRouter from 'vue-router'

import { setPageTitle } from '@/utils/page-title-util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: _ => import('@/layout/home'),
    redirect: '/article',
    hidden: true,
    children: [
      {
        path: 'index',
        component: _ => import('@/views/home/article'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'article',
        component: _ => import('@/views/home/article'),
        meta: {
          title: '文章'
        }
      },
      {
        path: 'article/:name*',
        component: _ => import('@/views/home/article/post-detail'),
      },
      {
        path: 'works',
        component: _ => import('@/views/home/article'),
        meta: {
          title: '作品'
        }
      },
      {
        path: 'about',
        component: _ => import('@/views/home/about'),
      },
    ]
  },
  {
    path: '/admin',
    component: _ => import('@/layout/admin'),
    redirect: '/admin/list',
    meta: {
      title: '博客管理'
    },
    children: [
      {
        path: 'list',
        component: _ => import('@/views/admin/post-list'),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'list/:action',
        component: _ => import('@/views/admin/post-list/detail'),
        hidden: true,
        meta: {
          title: '文章详情'
        }
      },
      {
        path: 'category',
        component: _ => import('@/views/admin/category'),
        meta: {
          title: '文章分类'
        }
      }

    ]
  },
  {
    path: '/redirect',
    hidden: true,
    component: _ => import('@/components/redirect'),
  },
  {
    path: '*',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: {
      title: '404-错误页'
    }
  }
]


const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

// 路由钩子修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    setPageTitle(to.meta.title)
  }
  next()
})

// 取消重复打开相同路由时控制台报错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
