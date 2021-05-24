import Vue from "vue";
import store from "./store";
import router from "./router";
import VueRouter from "vue-router";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBars,
  faCalendarAlt,
  faUser,
  faFilm,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faCalendarAlt as farCalendar,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueRouter);

library.add(
  faSearch,
  faBars,
  faCalendarAlt,
  faUser,
  farHeart,
  farCalendar,
  faFilm,
  faTicketAlt
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
