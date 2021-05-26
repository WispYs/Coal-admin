<template>
  <div class="login-wrapper">
    <div class="login-logo">
      <img src="@/assets/images/login_logo.png" alt="">
    </div>
    <div class="login-content">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="login-title">用户登录</div>
        <el-form-item prop="username">
          <span class="icon-container">
            <icon icon-class="fa-user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="icon-container">
            <icon icon-class="fa-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <icon :icon-class="passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'" />
          </span>
        </el-form-item>
        <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
    <div class="login-copyright">
      <p>版权所有：煤炭工业合肥设计研究院有限责任公司 皖ICP备170224号 地址：安徽省合肥市阜阳北路355号 邮编：230041</p>
      <p>电话：0551-65602155 0551-65602175 传真：0551-65526002 备案号：皖ICP备05006308号-1 技术支持：星铂软件</p>
    </div>
  </div>

</template>

<script>
import {
  authLogin
} from '@/api/user'
import {
  validUsername,
  validUserPassword
} from '@/utils/validate'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validUserPassword(value)) {
        callback(new Error('只能输入3-20个字母、数字、下划线'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const query = {
            loginName: this.loginForm.username,
            password: this.loginForm.password
          }
          localStorage.setItem('loginName', this.loginForm.username)
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // this.$router.push({ path: this.redirect || '/' })
            this.$router.push({
              path: '/'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })

          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   // this.$router.push({ path: this.redirect || '/' })
          //   this.$router.push({ path: '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;

    .login-logo {
      width: 1200px;
      margin: 0 auto;
      padding: 40px 10px 20px;

      img {
        height: 54px;
      }

    }

    .login-copyright {
      padding: 20px 0;

      p {
        font-size: 12px;
        color: #bbbbbb;
        line-height: 28px;
        text-align: center;
      }
    }
  }

  .login-content {
    height: calc(100% - 210px);
    width: 100%;
    position: relative;
    background: url('~@/assets/images/login_banner.jpg') no-repeat;
    background-size: cover;
    overflow: hidden;

    .login-form {
      position: absolute;
      top: 50%;
      left: 60%;
      transform: translateY(-50%);
      width: 400px;
      height: 450px;
      padding: 50px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
    }

    .icon-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .login-title {
      font-size: 22px;
      color: #333;
      margin: 0px auto 40px;
      text-align: center;
      letter-spacing: 1px;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }

    .login-button {
      width: 100%;
      margin-top: 20px;
    }

    ::v-deep {
      .el-input {
        display: inline-block;
        height: 50px;
        width: 85%;

        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          height: 100%;
        }
      }

      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: #f3f4f5;
        border-radius: 5px;
        color: #454545;
      }

      .el-button {
        padding: 17px 20px;
      }
    }
  }

  @media (min-width: 1280px) and (max-width: 1680px) {
    .login-content {
      .login-form {
        width: 320px;
        height: 360px;
        padding: 40px 40px 0;
      }

      .login-title {
        font-size: 20px;
        margin: 0px auto 40px auto;
        text-align: center;
        letter-spacing: 1px;
      }

      .icon-container {
        padding: 0 5px 0 15px;
      }

      ::v-deep {
        .el-input {
          height: 40px;
        }

        .el-button {
          padding: 14px 20px;
        }
      }
    }
  }

  @media screen and (max-width: 1280px) {
    .login-content {
      .login-form {
        width: 300px;
        height: 340px;
        padding: 40px 40px 0;
      }

      .login-title {
        font-size: 20px;
        margin: 0px auto 40px auto;
        text-align: center;
        letter-spacing: 1px;
      }

      .icon-container {
        padding: 0 5px 0 15px;
      }

      ::v-deep {
        .el-input {
          height: 40px;
        }

        .el-button {
          padding: 14px 20px;
        }
      }
    }

  }
</style>
