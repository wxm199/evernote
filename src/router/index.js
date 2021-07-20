import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "Notebooks" } },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/notebooks",
    name: "Notebooks",
    component: () => import("../views/Notebooks.vue"),
  },
  {
    path: "/note",
    name: "NoteDetail",
    component: () => import("../views/NoteDetail.vue"),
  },
  {
    path: "/trash",
    name: "Trash",
    component: () => import("../views/Trash.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
