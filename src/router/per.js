export default [
  { 
    path:'userStatistics', 
    meta: {
      auth: 'userStatistics',
    }, 
    name: 'userStatistics', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/UserStatistics.vue'),
  }, {
    path:'userAuth', 
    meta: {
      auth: 'userAuth',
    }, 
    name: 'userAuth', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/UserAuth.vue') 
  }, {
    path:'infoPublish', 
    meta: {
      auth: 'infoPublish',
    }, 
    name: 'infoPublish', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/InfoPublish.vue') 
  }, {
    path:'articleManager', 
    meta: {
      auth: 'articleManager',
    }, 
    name: 'articleManager', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/ArticleManager.vue') 
  }, {
    path:'personal', 
    meta: {
      auth: 'personal',
    }, 
    name: 'personal', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/Personal.vue') 
  }, {
    path:'myCollection', 
    meta: {
      auth: 'myCollection',
    }, 
    name: 'myCollection', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/MyCollection.vue') 
  }, {
    path:'privateMessage', 
    meta: {
      auth: 'privateMessage',
    }, 
    name: 'privateMessage', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/PrivateMessage.vue') 
  },{
    path:'myArticle', 
    meta: {
      auth: 'myArticle',
    }, 
    name: 'myArticle', 
    component: () =>import(/*webpackChunkName:'manager'*/'@/views/manager/MyArticle.vue') 
  },
];