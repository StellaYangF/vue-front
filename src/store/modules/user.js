import {
  SET_USER, SET_PERMISSION, SET_MENU_PERMISSION, USER_VALIDATE, USER_LOGOUT, ADD_ROUTE,
} from '../action-types';
import { getLocal, setLocal } from '@/utils';
import * as user from '@/api/user';
import router from '@/router';
import per from '@/router/per.js';

export default {
  state: {
    userInfo: {},
    hasPermission: false,
    menuPermission: false,
  },

  mutations: {
    [SET_USER](state, userInfo) {
      state.userInfo = userInfo;
      if (userInfo && userInfo.token) {
        setLocal('token', userInfo.token);
      } else {
        localStorage.clear('token');
      }
    },
    [SET_PERMISSION](state, has) {
      state.hasPermission = has;
    },
    [SET_MENU_PERMISSION](state, has) {
      state.menuPermission = has;
    }
  },

  actions: {
    async [SET_USER]({ commit}, { payload, permission }) {
      commit(SET_USER, payload);
      commit(SET_PERMISSION, permission);
    },
    async [USER_VALIDATE]({ dispatch }) {
      if (!getLocal('token')) return false;
      try {
        let result = await user.validate();
      } catch(e) {}
    },
    async [USER_LOGOUT]({ dispatch }) {
      dispatch(SET_USER, { payload: {}, permission: false });
    },
    async [ADD_ROUTE]({ commit, state }) {
      let authList = state.userInfo.authList;
      if (authList) {
        let routes = filterRouter(authList);
        let route = router.options.routes.find(item => item.path === '/manager');
        route.children = routes;
        router.addRoutes([route]);
        commit(SET_MENU_PERMISSION, true);
      } else {
        commit(SET_MENU_PERMISSION, true);
      }
    }
  }
}