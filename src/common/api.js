import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// 요청 인터셉터
api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    alert('에러가 발생했습니다.')
    return Promise.reject(error)
  }
)

Vue.use(VueAxios, api)
