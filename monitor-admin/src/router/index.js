import Vue from 'vue'
import Router from 'vue-router'
import MemoryLimit from '@/components/MemoryLimit'
import MemoryUsed from '@/components/MemoryUsed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/memoryUsed',
      name: 'MemoryUsed',
      component: MemoryUsed
    },
    {
      path: '/memoryLimit',
      name: 'MemoryLimit',
      component: MemoryLimit
    }
  ]
})
