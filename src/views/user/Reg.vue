<template>
  <div class='reg-page'>
    <el-row>
      <el-col class='title'>
        <h2>欢迎注册</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='10' :offset="7">
        <el-form
          :model='regForm'
          status-icon
          :rules='rules'
          ref='regForm'
          class='demo-ruleForm'
          label-width="100px"
        >
          <el-form-item label='请输入邮箱' prop='username'>
            <el-input
              type='text'
              placeholder="请输入正确的邮箱地址"
              v-model='regForm.username'
              autocomplete='off'
            ></el-input>
          </el-form-item>
          <el-form-item label='确认密码' prop='password'>
            <el-input
              type='password'
              placeholder="请输入密码"
              v-model='regForm.password'
              autocomplete='off'
            ></el-input>
          </el-form-item>
          <el-form-item label='密码' prop='checkPass'>
            <el-input
              type='password'
              placeholder="请再次输入输入密码"
              v-model='regForm.checkPass'
              autocomplete='off'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='submitForm("regForm")'>注册</el-button>
            <el-button @click='resetForm("regForm")'>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as user from '@/api/user';
export default {
  data() {
    let checkEmail = (rule, value, callback) => {
      if (!value) return callback(new Error('用户名不正确'));
      callback();
    };
    let checkPassword1 = (rule, value, callback) => {
      if (!value) return callback(new Error('密码必填'));
      else {
        // if (this.regForm.checkPass !== '') return this.$refs.regForm.validateField('checkPass');
        callback();
      }
    }
    let checkPassword2 = (rule, value, callback) => {
      if (!value) return callback(new Error('请再次输入密码'));
      if (value !== this.regForm.password) return callback(new Error('两次输入密码不一致！'));
      callback();
    }
    return {
      regForm: {
        username: '',
        password: '',
        checkPass: '',
      },
      rules: {
        username: [{ validator: checkEmail, trigger: 'blur' }],
        password: [{ validator: checkPassword1, trigger: 'blur' }],
        checkPass: [{ validator: checkPassword2, trigger: 'blur' }],
      }
    }
  },

  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(async valid =>{
        if (valid) {
          try {
            await user.reg(this.regForm);
            this.$message({
              type: 'success',
              message: '注册成功，去登陆',
            })
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000)
          } catch(err) {
            this.$message({
              type: 'error',
              message: err,
            })
          }
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>