export default [
  {
    path: '/',
    component:() => import(/*webpackChunkName: 'home'*/'@/views/Home.vue')
  }, {
    path: '*',
    component: () => import(/*webpackChunkName: '404'*/'@/views/404.vue')
  }
]