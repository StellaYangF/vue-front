<template>
  <div id="app">
    <!-- el-container 会检测内部是否有 el-header和el-footer -->
    <el-container style="min-width:960px">
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
export default {
  components: {
    PageHeader,
    PageFooter
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background: #333;
}
.el-footer {
  background: #333;
}
.el-main {
  min-height: calc(100vh - 120px);
}
</style>
