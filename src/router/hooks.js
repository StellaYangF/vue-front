import store from '@/store';
import {
  USER_VALIDATE,
  ADD_ROUTE
} from '@/store/action-types';

// 登录权限
export const loginPermission = async function(to, from, next) {
  let validated = await store.dispatch(`user/${USER_VALIDATE}`);
  let needLogin = to.matched.some(item => item.meta.needLogin);
  if (!store.state.user.hasPermission) {
    if (needLogin) {
      if (validated) {
        next();
      } else {
        next('/login');
      }
    } else { // 没登录 也不用权限
      next();
    }
  } else {
    // 登录过
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  }
}

// 路由权限
export const menuPermission = async function(to, from ,next) {
  if (store.state.user.hasPermission) { // 登陆过
    if (!store.state.user.menuPermission) { // 没有菜单权限
      store.dispatch(`user/${ADD_ROUTE}`)
    }
  } else {
    // 没有权限
    next();
  }
}

