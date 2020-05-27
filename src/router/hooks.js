import store from '@/store';
import {
  USER_VALIDATE,
} from '@/views/action-types';

// 登录权限
export const loginPermission = async function(to, from, next) {
  let r = await store.dispatch(`/user/${USER_VALIDATE}`);
  let needLogin = to.matched.some(item => item.meta.needLogin);

  if (!store.state.user.hasPermission) {
    if (needLogin) {
      if (r) {
        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  }
  next();
}

// 路由权限
export const menuPermission = async function(to, from ,next) {
  if (store.state.user.hasPermission) {
    
  }
}

