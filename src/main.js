import Vue from 'vue'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMoment from 'vue-moment'
import VueI18n from 'vue-i18n'
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
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faHome,
  faMouse,
  faShareAlt,
  faBookOpen,
  faUsers,
  faMugHot
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as farHeart,
  faCalendarAlt as farCalendar,
  faSun as farSun,
  faMoon as farMoon
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getStorage } from './common/utils'
import { ID_TOKEN_KEY } from './store/constant'

Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(VueI18n)

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
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faHome,
  faMouse,
  faShareAlt,
  faBookOpen,
  faUsers,
  farSun,
  faMugHot,
  farMoon
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

const messages = {
  en: {
    messages: {
      sunday: 'Su'
    }
  },
  ko: {
    message: {
      sunday: '일'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ko',
  messages
})

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
