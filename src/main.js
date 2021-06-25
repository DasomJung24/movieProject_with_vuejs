import Vue from 'vue'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMoment from 'vue-moment'
import * as filters from './common/filters'
import './common/api'
import '@/common/validation/vee-validate.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faBars,
  faCalendarAlt,
  faUser,
  faFilm,
  faTicketAlt,
  faChevronDown,
  faHeart,
  faHome,
  faMouse
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as farHeart,
  faCalendarAlt as farCalendar
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getStorage } from './common/utils'
import { ID_TOKEN_KEY } from './store/constant'

Vue.use(VueRouter)
Vue.use(VueMoment)

library.add(
  faSearch,
  faBars,
  faCalendarAlt,
  faUser,
  farHeart,
  farCalendar,
  faFilm,
  faTicketAlt,
  faChevronDown,
  faHeart,
  faHome,
  faMouse
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Object.keys(filters).forEach(function (key) {
  Vue.filter(key, filters[key])
})

const authentication = () => {
  const accessToken = getStorage(ID_TOKEN_KEY)
  if (accessToken) {
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    store.dispatch('ME')
  }
}

authentication()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
