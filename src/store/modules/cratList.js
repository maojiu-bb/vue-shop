import { reqGetCartList, reqDeleteCartList, reqChangeCheckCart } from '@/api'
import { getUUid } from '@/utils/uuid_token.js'

const state = {
  cartList: [],
  UUid: getUUid()
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  async getCartList({ commit }) {
    const result = await reqGetCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // eslint-disable-next-line no-unused-vars
  async deleteCartList({ commit }, skuId) {
    const result = await reqDeleteCartList(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // eslint-disable-next-line no-unused-vars
  async changeCheckCart({ commit }, { skuID, isChecked }) {
    const result = await reqChangeCheckCart(skuID, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  deleteAllCheckedCart({ dispatch, getters }) {
    const promiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        const promise = dispatch('deleteCartList', item.skuId)
        promiseAll.push(promise)
      }
    })
    return Promise.all(promiseAll)
  },
  changeAllCheckCart({ dispatch, getters }, checked) {
    const promiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      const promise = dispatch('changeCheckCart', {
        skuID: item.skuId,
        isChecked: checked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
