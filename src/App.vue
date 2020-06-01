<template>
  <div id='app'>
    <el-container style='min-width: 960px'>
      <el-header>
        <page-header></page-header>
      </el-header>
      <el-main style='padding:0'>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <page-footer></page-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

export default {
  components: {
    PageHeader,
    PageFooter,
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.el-header, .el-footer {
  background: #333;
  color: #fff;
}
.el-main {
  min-height: calc(100vh - 120px);
}
.title {
  text-align: center;
  margin: 10px auto 30px;
}
</style>