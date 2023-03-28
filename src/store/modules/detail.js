// 商品详情小仓库
import { reqGetGoodsInfo, reqAddOrUpdateGoods } from '@/api'

const state = {
  goodsInfo: {}
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取产品信息
  async getGoodsInfo({ commit }, skUid) {
    const result = await reqGetGoodsInfo(skUid)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 添加到购物车
  // eslint-disable-next-line no-unused-vars
  async addOrUpdateGoods({ commit }, { skUid, skuNum }) {
    const result = await reqAddOrUpdateGoods(skUid, skuNum)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  skuSaleAttrValueList(state) {
    return state.goodsInfo.skuInfo.skuSaleAttrValueList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
