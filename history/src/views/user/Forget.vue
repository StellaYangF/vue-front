<template>
  <el-row>
    <el-col :offset="6" :span="12">
      <el-steps :active="active" finish-status="success" style="margin-bottom:50px">
        <el-step title="验证邮箱 1"></el-step>
        <el-step title="修改密码 2"></el-step>
        <el-step title="完成 3"></el-step>
      </el-steps>
    </el-col>
  </el-row>
</template>


<style lang="scss">
.title {
  text-align: center;
  line-height: 50px;
}
</style>