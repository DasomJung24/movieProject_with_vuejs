import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../components/layouts/Layout.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  hashbang: false,
  base: "/",
  routes,
});

export default router;
