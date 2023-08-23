import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('@/views/home')
      },
      {
        path: '/question-answer',
        name: 'questionAnswer',
        component: () => import('@/views/questionAnswer')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: () => import('@/views/userProfile')
  },
  {
    path: '/chat-robot',
    name: 'chatRobot',
    component: () => import('@/views/chatRobot')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
