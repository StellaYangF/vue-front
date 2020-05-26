import Vue from 'vue';
import router from './router';
import App from './App';
import './plugins/element';
import store from './store';

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})