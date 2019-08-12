import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Imgtemp from '@/components/imagetemp/imagetemp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
    	path: '/imgtemp',
      name: 'Imgtemp',
      component: Imgtemp
    }
  ]
})
