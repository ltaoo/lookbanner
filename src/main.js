import Vue from 'vue'
import App from './App'
// 加载 element 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
// 加载 ajax 库
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 注册指令
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
//
import Index from './components/Index'
// 个人中心页面
import Person from './components/Person'
// 根据网站显示
import WebDetail from './containers/Web'

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
  },
  {
    path: '/web/:name',
    component: WebDetail
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
