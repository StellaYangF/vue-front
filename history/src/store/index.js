import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule';

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
files.keys().forEach(key => {
    // 模块对应的内容
    let store = files(key).default;
    let moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '');
    // 动态的添加模块
    let modules = rootModule.modules = (rootModule.modules || {});
    modules[moduleName] = store;
    modules[moduleName].namespaced = true;
});

let store = new Vuex.Store(rootModule);
console.log(store)
export default store;