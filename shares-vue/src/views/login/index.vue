<template>
  <div class="login-wrapper" id="app">
    <div class="login-container">
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        ref="LoginFormRef"
        :rules="loginFormRules"
        label-width="70px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="loginForm.userName" prefix-icon="iconfont icon-user" size="mini"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            size="mini"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <div class="btns">
          <el-button type="primary" @click="login" size="mini">登录</el-button>
          <el-button type="info" @click="resetLoginForm" size="mini">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      //数据绑定
      index: 0,
      loginForm: {
        userName: '',
        password: ''
      },
      //表单验证规则
      loginFormRules: {
        userName: [
          {
            required: true,
            message: '请输入登录名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '登录名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields()
    },
    async login() {
      this.$refs.LoginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        let params = {
          userName: this.loginForm.userName,
          password: this.loginForm.password
        }
        const res = await login(params)
        const { code, data, msg } = res
        if (code && code === '200') {
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        } else {
          this.$message.error(msg)
          return
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: #000;
}

.login-container {
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  z-index: 2;
  text-align: center;
}

.login-container >>> .el-form-item__label {
  color: #fff;
}

.login-container >>> .el-input--prefix .el-input__inner {
  padding-left: 15px;
}

.login_form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
}
</style>
