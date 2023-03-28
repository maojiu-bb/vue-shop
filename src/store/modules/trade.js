import { reqTrade } from '@/api'

const state = {
  trade: {}
}
const mutations = {
  TRADE(state, trade) {
    state.trade = trade
  }
}
const actions = {
  async trade({ commit }) {
    const result = await reqTrade()
    if (result.code === 200) {
      commit('TRADE', result.data)
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
