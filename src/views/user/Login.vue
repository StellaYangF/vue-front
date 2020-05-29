<template>
  <div class='login-page'>
    <el-row>
      <el-col class='title'>
        <h2>欢迎登陆</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='10' :offset='7'>
        <el-form
          :model='loginForm'
          status-icon
          :rules='rules'
          ref='loginForm'
          label-width='100px'
          class='login-form'
        >
          <el-form-item label='请输入邮箱' prop='username'>
            <el-input
              type='text'
              placeholder="请输入邮箱"
              v-model="loginForm.username"
              autocomplete='off'
            ></el-input>
          </el-form-item>
          <el-form-item label='请输入密码' prop='password'>
            <el-input 
              type='password'
              placeholder="请输入密码"
              v-model="loginForm.password"
              autocomplete='off'
            ></el-input>
          </el-form-item>
          <el-form-item label='验证码' prop='code'>
            <el-row>
              <el-col :span='7'>
                <el-input type='text' placeholder="验证码" v-model='loginForm.code' autocomplete='off'></el-input>
              </el-col>
              <el-col :span='6' :offset="1">
                <div v-html="verify" @click='getCaptcha' style='cursor: pointer'></div>
              </el-col>
              <el-col :span='5' :offset="5">
                <el-button type='text' @click="$router.push('/forget')">忘记密码？</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='submitForm("loginForm")'>登陆</el-button>
            <el-button @click='resetForm("loginForm")'>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { v4 } from 'uuid';
import { getLocal, setLocal } from '@/utils/local.js';
import { getCaptcha } from '@/api/public';
import { USER_LOGIN } from '../../store/action-types';
let { mapActions } = createNamespacedHelpers('user');

export default {
  data() {
    let checkFn = (msg, code) =>  (rule, value, callback) => {
      if (!value) {
        return callback(new Error(msg));
      }
      if (code && value.length != 4 ) {
        return callback(new Error(msg));
      }
      return callback();
    };

    let checkEmail = checkFn('邮箱不正确');
    let checkPassword = checkFn('请输入密码');
    let checkCode = checkFn('验证码长度必须为4', 'code');
    
    return {
      loginForm: {
        username: '',
        passoword: '',
        code: '',
      },
      rules: {
        username: [ { validator: checkEmail, trigger: 'blur' } ],
        password: [ { validator: checkPassword, trigger: 'blur' } ],
        code: [ { validator: checkCode, trigger: 'blur' } ],
      },
      verify: '',
    }
  },

  methods: {
    ...mapActions([USER_LOGIN]),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            await this[USER_LOGIN]({ ...this.loginForm, uid: this.uid});
            this.$message({ type: 'success', message: '登陆成功' })
          } catch(e) {
            this.$message({ type: 'error', message: e });
          }
        } else return false;
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getCaptcha() {
      let { data } = await getCaptcha();
      this.verify = data;
    }
  },
  async created() {
    this.uid = getLocal('uuid');
    if (!this.uid) {
      setLocal('uuid', v4());
    }
    this.getCaptcha();
  }
}
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
    margin: 10px auto 30px;
  }
</style>