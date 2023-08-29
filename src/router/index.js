import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          requiredAuth: false,
          index: 0
        }
      },
      {
        path: '/question-answer',
        name: 'questionAnswer',
        component: () => import('@/views/questionAnswer'),
        meta: {
          requiredAuth: true,
          index: 1
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
          requiredAuth: true,
          index: 2
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          requiredAuth: false,
          index: 3
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: () => import('@/views/userProfile'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/chat-robot',
    name: 'chatRobot',
    component: () => import('@/views/chatRobot'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

// const _routerMap = {
//   home: 0,
//   question: 1,
//   video: 2,
//   my: 3
// }
// router beforeEach
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (!store.state.user) {
      Dialog.confirm({
        message: '该内容需要登录才能访问，你要登录吗？'
      })
        .then(() => {
          // on confirm
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        })
        .catch(() => {})
    } else {
      if (to.meta.index) {
        store.commit('setTabBarActive', to.meta.index)
      }
      next()
    }
  } else {
    if (to.meta.index || to.meta.index === 0) {
      store.commit('setTabBarActive', to.meta.index)
    }
    next()
  }
})

export default router
