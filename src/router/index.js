import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import AdminCreate from '@/views/Admin/AdminCreate.vue'
import AdminIndex from '@/views/Admin/AdminIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminIndex
  },
  {
    path: '/admin/create',
    name: 'create',
    component: AdminCreate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
