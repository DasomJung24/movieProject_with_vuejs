import Vue from 'vue'
import Vuex from 'vuex'
import { ID_TOKEN_KEY } from './constant'
import { getStorage, setStorage } from '../common/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    isAuthenticated: !!getStorage(ID_TOKEN_KEY)
  },
  getters: {
    currentUser (state) {
      return state.user
    },
    permissions (state) {
      return state.user.user_permissions
    },
    isAuthenticated (state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    LOGIN (state, accessToken) {
      state.isAuthenticated = true
      state.token = accessToken
      setStorage(ID_TOKEN_KEY, accessToken)
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async LOGIN ({ commit }, credentials) {
      const res = await Vue.axios.post('login', credentials)
      const accessToken = res.data.token || null
      if (accessToken) {
        Vue.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        commit('LOGIN', accessToken)
        commit('SET_USER', res.data)
      }
      return res
    }
  }
})
