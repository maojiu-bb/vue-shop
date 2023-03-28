import Vue from 'vue'
import Vuex from 'vuex'

// 导入小仓库
import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import cartList from './modules/cratList'
import user from './modules/user'
import trade from './modules/trade'

// 使用插件
Vue.use(Vuex)

// 对外暴露 Store 类的一个实例
export default new Vuex.Store({
  // 实现 Vuex 仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    cartList,
    user,
    trade
  }
})
