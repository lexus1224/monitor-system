import Vue from 'vue'
import Router from 'vue-router'
import MemoryLimit from '@/components/MemoryLimit'
import MemoryUsed from '@/components/MemoryUsed'
import Browser from '@/components/Browser'
import OperateSystem from '@/components/OperateSystem'

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
    },
    {
      path: '/browser',
      name: 'Browser',
      component: Browser
    },
    {
      path: '/operateSystem',
      name: 'OperateSystem',
      component: OperateSystem
    }
  ]
})
