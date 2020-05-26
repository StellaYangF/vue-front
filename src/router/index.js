import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// false 读取的子目录
// webpack 方法 => require.context
const files = require.context('./', false, /\.router.js$/);
const routes = [];
files.keys().forEach(key => routes.push(...files(key).default));

const router  = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;