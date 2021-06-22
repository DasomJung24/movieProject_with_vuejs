import Vue from 'vue'
import Vuex from 'vuex'
import { ID_TOKEN_KEY } from './constant'
import { getStorage, removeStorage, setStorage } from '../common/utils'

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
      state.isAuthenticated = true
      state.user.email = user.email
      state.user.name = user.name
      state.user.theaters = user.theaters
      state.user.phone_number = user.phone_number
      state.user.birth = user.birth
      state.user.is_unmanned_ticket = user.is_unmanned_ticket
      state.user.is_marketing = user.is_marketing
      state.user.receive_settings = user.receive_settings
      state.user.movies = user.movies
    },
    LOGOUT (state) {
      state.user = {}
      state.isAuthenticated = false
      state.token = null
      removeStorage(ID_TOKEN_KEY)
    }
  },
  actions: {
    async LOGIN ({ commit }, credentials) {
      const res = await Vue.axios.post('login', credentials)
      const accessToken = res.data.token || null
      if (accessToken) {
        Vue.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        commit('LOGIN', accessToken)
        console.log(res.data)
        commit('SET_USER', res.data)
      }
      return res
    },
    async ME ({ commit }) {
      const { data, status } = await Vue.axios.get('me')
      if (status === 403) {
        commit('LOGOUT')
      } else {
        console.log('#######', data)
        commit('SET_USER', data)
      }
    },
    LOGOUT ({ commit }) {
      commit('LOGOUT')
    }
  }
})
