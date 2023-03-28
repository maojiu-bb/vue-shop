import {
  reqGetCode,
  reqRegister,
  reqLogin,
  reqUserInfo,
  reqLogout
} from '@/api/index'
import { getToken, setToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  LOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = ''
    localStorage.removeItem('TOKEN')
  }
}
const actions = {
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, user) {
    const result = await reqRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // eslint-disable-next-line no-unused-vars
  async login({ commit }, data) {
    const result = await reqLogin(data)
    if (result.code === 200) {
      commit('LOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async userInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('USERINFO', result.data)
    }
  },
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
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
