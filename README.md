# Vue 构建 Web 运用

项目实践目标:
1. 建立 Vue CLI4 版本的环境搭建
2. 路由配置的模块化管理
3. element-UI 的应用和组件模块化管理
4. axios 的二次封装
5. vuex 的模块化配置
6. 获取后台数据应用到
7. 轮播图小案例
8. 用户注册和登录权限的应用
9. 验证码的应用
10. 路由和菜单权限的渲染和处理
11. 对 webSocket 的封装和使用

## 二次封装 axios
基于 `axios` 二次封装 `Http` 请求类，内部封装好请求和响应的拦截 (**interceptors**)，实现基础功能:
- `get`(url, config)
- `post`(url, data)
- `request`(config)

## vuex 模块化配置
配置 `store` 仓库，实现全局组件的数据共享，通过 `require.context` 动态引入子模块 (module)，包括
- user module
- artile module
- rootModule

## 接口管理
- 编写调用后天接口，获取数据
- 接口调用位置

### 编写调用后天接口，获取数据
构建 api 目录
该目录下，放置与后台交互的接口文件

- **config** 目录，配置接口的路径信息，如：**/public/getSlider**, **/user/login**
- **public.js** 引入 `axios` (二次封装后的) 发起后台请求，获取数据，公共数据接口
- **user.js** 与用户相关接口数据，如：登录、注册、注销、忘记密码等

### 接口调用位置

- 页面中直接调用
- vuex 中
  - 当数据是全局时
  - 提高复用性
  - 做缓存功能

**vuex 中调用接口**
在 store 目录下，新增 action-types 文件，存放派发动作的名称。
原因：
- mutations, actions 中编写的动作名
- 会在调用的时候再次书写，避免出错

代码示例：
```js
new Vue({
  computed: {
      ...mapState([ 'sliders' ]),
    },
  
    methods: {
      ...mapActions([ SET_SLIDER ]),
    },
  
    async created() {
      if (this.sliders) return;
      await this[SET_SLIDER]();
      console.log(this.sliders);
    },
})
```
> 注意：在派发 **SET_SLIDERS** 动作时，如果想立即拿到获取后的 sliders，需要 async... await，由于是异步请求。

### 获取验证码
- 登陆页，利用 uuid 产生唯一标识去后台获取验证码
- 用户名/密码/验证码，后台验证登陆通过后，返回用户信息，携带 token
- 保存 token， 并修改全局状态 userInfo, hasPermission
- 根据 permission 状态，动态渲染顶部右侧菜单栏

### 新增 validate 接口

实现
```js
export const validate = () => axios.get(user.validate);
```

调用
```js
async [USER_VALIDATE]({ dispatch }) {
    if (!getLocal('token')) return false;
    try {
        let result = await validate();
        dispatch(SET_USER, { payload: result.data, permisson: true });
        return true;
    } catch(err) {
        dispatch(SET_USER, { payload:{}, permisson: false });
        return false;
    }
},
```

### 新增 router hooks

全局路由钩子函数 beforeEach，添加：
- 登陆权限钩子 loginPermission(to, from, next)

## 路由/菜单权限

在登录权限后，新增菜单权限，根据当前登录的用户类别，动态添加路由

- 管理员
- 普通用户

**router/hooks.js**

```js
export const menuPermission = async function(to, from, next) {
  if (store.state.user.hasPermission) {
    if (!store.state.user.menuPermission) {
      store.dispatch(`user/${ADD_ROUTE}`);
      next({ ...to, replace: true });
    }
    next();
  } else {
    next();
  }
}
```

**store/module/user.js**

```js
/* dynamic router */ 
async [ADD_ROUTE]({ commit, state }) {
  let authList = state.userInfo.authList;
  if (authList) {
    // server responded authList
    let routes = filterRouter(authList);
    let route = router.options.routes.find(item => item.path === '/manager');
    route.children = routes;
    console.log(route);
    router.addRoutes([route]); // add routes
    commit(SET_MENU_PERMISSION,  true);
  } else {
    commit(SET_MENU_PERMISSION, true);
  }
}
```

**递归过滤符合权限的菜单路由**

```js
const filterRouter = authList => {
  // pid: -1
  // _id: "5edcc4d71f9b5a73e1f77293"
  // name: "我的文章"
  // auth: "myArticle"
  // id: 9
  // role: "5ec73bc0c514dc322467cd63"
  // path: "/manager/myArticle"
 let auths = authList.map(auth => auth.auth);
  function filter(routes) {
   return routes.filter(route => {
     if (auths.includes(route.meta.auth)) {
       if (route.children) {
         route.children = filter(route.children);
       }
       return route;
     }
   })
 };

 return filter(permission);
};
```

**MyMenu**

```js
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('user');

export default {
  name: 'my-menu',

  data() {
    return {
      list: [],
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    getMenuList(authList) {
      // pid: -1
      // _id: "5edcc4d71f9b5a73e1f77293"
      // name: "我的文章"
      // auth: "myArticle"
      // id: 9
      // role: "5ec73bc0c514dc322467cd63"
      // path: "/manager/myArticle"
      let menu = [];
      let map = {};
      authList.forEach(m => {
        m.children = [];
        map[m.id] = m;
        if (m.pid == -1) {
          menu.push(m);
        } else {
          map[m.pid] && map[m.pid].children.push(m)
        }
      });
      return menu;
    }
  },

  mounted() {
    this.list = this.getMenuList(this.userInfo.authList);
  },

  render() {
    let renderChildren = list => {
      return list.map(child => {
        return child.children.length ?
          <el-submenu index={ child._id }>
            <div slot='title'>{ child.name }</div>
            {/* 递归 */}
            { renderChildren(child.children) }
          </el-submenu> :
          <el-menu-item index={ child.path }>
            <router-link to={child.path} style={ { color: '#fff' } }>{ child.name }</router-link>
          </el-menu-item>
      })
    }
    return <el-menu
        background-color='#333'
        text-color='#fff'
        active-text-color='#ffd04b'
        class='menu'
    >
      { renderChildren(this.list) }
    </el-menu>
  },
}
```

## 踩坑记录

- 登陆捕获错误，密码或验证码错误时，状态码也是 200
- 需要手动判断 result.err (1)
- **返回** `Promise.reject(reason)`
- 避免调用时报错 
  - `Uncaught (in promise) 用户名密码错误`

```js
async [USER_LOGIN]({ dispatch }, payload) {
    try {
        let result = await login(payload);
        if (result.err) {
            return Promise.reject(result.data);
        } else {
            dispatch(SET_USER, { payload: result.data, permisson: true });
        }
    } catch(error) {
        return Promise.reject(error);
    }
},
```
