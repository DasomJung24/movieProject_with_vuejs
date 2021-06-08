import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    redirect: "/",
    component: () => import("../components/layouts/Layout.vue"),
    children: [
      {
        path: "/",
        name: "MainList",
        component: () => import("../views/Main.vue"),
      },
      {
        path: "movies",
        name: "MovieList",
        component: () => import("../views/movies/MovieList.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  hashbang: false,
  base: "/",
  routes,
});

export default router;
