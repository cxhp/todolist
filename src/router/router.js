import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/home.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
    name: 'todolist',
    path: '/todolist',
    component: resolve => require(['../components/home.vue'], resolve)
    }
  ]
})
