import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/p/:slug',
      name: 'about',
      component: () => import('@/views/PostDetail.vue')
    }
  ]
})

export default router
