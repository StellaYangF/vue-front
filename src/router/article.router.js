export default [
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/article/Post.vue"),
    meta: {
      needLogin: true,
    },
  },
];
