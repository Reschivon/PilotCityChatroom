import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/AuthPage.vue";
//import Settings from "../Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chat",
    name: "Chat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Chat.vue"),
  },
  {
    path: "/settings/user",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserSettings.vue"),
  },
  {
    path: "/settings/meeting",
    name: "MeetingSettings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetingSettings.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
