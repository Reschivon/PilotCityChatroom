import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/AuthPage.vue";
// import * as services from "../services";

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
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/settings/user",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserSettings.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/settings/meeting",
    name: "MeetingSettings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetingSettings.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
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

// router.beforeEach((to, from, next) => {
//   // Check to see if route requires auth
//   if (to.matched.some((rec) => rec.meta.requiresAuth)) {
//     // Check auth state of user
//     services.messageclient
//       .reAuthenticate()
//       .then(() => {
//         next();
//       })
//       .catch(() => {
//         next({ name: "Auth" });
//       });
//   } else {
//     next();
//   }
// });

export default router;
