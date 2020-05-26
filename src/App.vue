<template>
  <div id='app'>
    <el-container>
      <el-header>
        <page-header></page-header>
      </el-header>
      <el-main></el-main>
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