import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'

// home 小仓库
const state = {
  categoryList: [],
  getBannerList: [],
  getFloorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, getBannerList) {
    state.getBannerList = getBannerList
  },
  GETFLOORLIST(state, getFloorList) {
    state.getFloorList = getFloorList
  }
}
const actions = {
  // 通过 API 里面的接口函数调用，发送请求，获取服务器数据
  // 返回的是一个 Promise 对象
  async categoryList({ commit }) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // banner 轮播图
  async getBannerList({ commit }) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // floor 楼层
  async getFloorList({ commit }) {
    const result = await reqGetFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
