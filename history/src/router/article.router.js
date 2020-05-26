export default [{
    path: '/post',
    name: 'post',
    component: () => import( /*webpackChunkName:'post'*/ '@/views/article/Post.vue'),
    meta:{
        needLogin:true
    }
}]