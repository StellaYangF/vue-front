import Vue from 'vue';
import Vuex from 'vuex';
import rootModule from './rootModule';

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
files.keys(files).forEach(key => {
  let module = files(key).default;
  let moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '');
  // 动态添加路由
  let modules = rootModule.modules = rootModule.modules || {};
  modules[moduleName] = {...module, namespaced: true};
})

const store = new Vuex.Store(rootModule);

export default store;