import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/Layout/Layout.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/Layout/Article/Manage.vue'),
        },
        {
          path: 'article/channel',
          component: () => import('@/views/Layout/Article/Channel.vue'),
        },
        {
          path: 'user/profile',
          component: () => import('@/views/Layout/User/Profile.vue'),
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/Layout/User/Avatar.vue'),
        },
        {
          path: 'user/password',
          component: () => import('@/views/Layout/User/Password.vue'),
        },
      ],
    },
  ],
})

// 路由拦截器
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
