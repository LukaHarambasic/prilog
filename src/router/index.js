import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LogsDetails from '@/views/Logs/LogsDetails.vue'
import AdminCreateLog from '@/views/Admin/AdminCreateLog.vue'
import AdminCreateEntry from '@/views/Admin/AdminCreateEntry.vue'
import AdminIndex from '@/views/Admin/AdminIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/logs/:id',
    name: 'logsDetails',
    component: LogsDetails
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminIndex
  },
  {
    path: '/admin/create/log',
    name: 'createLog',
    component: AdminCreateLog
  },
  {
    path: '/admin/create/entry',
    name: 'createEntry',
    component: AdminCreateEntry
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
