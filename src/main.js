import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from './router/index.js'
// 导入仓库
import store from './store'
// 导入 mock 模拟数据
import '@/mock/mockServe'
// 导入  swiper 样式
import 'swiper/css/swiper.css'
// 导入全局api
import * as API from '@/api/index'
// 导入全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 轮播图
import CarouselCom from '@/components/Carousel/CarouselCom.vue'
// 分页器全局组件
import PaginationCom from '@/components/Pagination/PaginationCom.vue'
// element-ul
import ElementUI from 'element-ui'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// element-ul 样式
import 'element-ui/lib/theme-chalk/index.css'

import logo from '@/assets/logo.png'

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  loading: logo
})
// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('CarouselCom', CarouselCom)
Vue.component('PaginationCom', PaginationCom)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  // 全局事件总线 $bus 配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
