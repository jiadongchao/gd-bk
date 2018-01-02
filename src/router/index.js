import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
 mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve=>{require(['@/pages/home/home.vue'],resolve)}
    },
    {
      path: '/detail',
      name: 'Detail',
      component:resolve=>{require(['@/pages/detail/detail.vue'],resolve)}
    }
    
  ]
})
