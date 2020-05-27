<template>
  <el-row class='header-row'>
    <el-col :span='18'>
      <img src="@/assets/logo.png" class="logo">
      <el-menu
        class='menu'
        mode='horizontal'
        background-color="#333"
        text-color="#fff"
        active-text-color="#fff"
        :rooter='true'
      >
        <el-menu-item index='/'>Home</el-menu-item>
        <el-menu-item index='/post'>Post</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span='6'>
      <div class='nav-right'>
        <el-menu
          class='el-menu-demo'
          mode='horizontal'
          background-color="#333"
          text-color="#fff"
          active-text-color="#fff"
        >
          <template v-if='!hasPermisson'>
            <el-menu-item index='login'>Login</el-menu-item>
            <el-menu-item index='reg'>Register</el-menu-item>
          </template>
          <el-submenu index='profile'>
            <template slot='title'>{{ userInfo.username }}</template>
            <el-menu-item @click='$router.push("/manager")'>Manage backend</el-menu-item>
            <el-menu-item index='logout' @click='logout'>Logout</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
let { 
  mapState, 
  mapActions,
} = createNamespacedHelpers('user');
import { 
  USER_LOGIN, 
  USER_LOGOUT ,
} from '../store/action-types';

export default {
  computed: {
    ...mapState(['hasPermisson', 'userInfo'])
  },
  methods: {
    ...mapActions([USER_LOGOUT]),
    logout() {
      this[USER_LOGOUT]();
    },
  }
}
</script>

<style lang="scss">
  .header-row {
    height: 100%;
    .logo {
      height: 50px;
      margin: 5px;
    }
    .menu, .logo {
      display: inline-block;
    }
    .nav-right {
      float: right;
      li {
        display: inline-block;
        text-align: center;
        line-height: 60px;
      }
      a {
        color: #fff;
      }
    }
  }
</style>