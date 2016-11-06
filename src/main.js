import Vue from 'vue'
import App from './App'
//
import Index from './components/Index'
//
import Person from './components/Person'

// 加载路由模块 http://router.vuejs.org/
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 配置路由
const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/person',
    component: Person
  }
]
// 创建 router 实例
const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载到根实例上
new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
