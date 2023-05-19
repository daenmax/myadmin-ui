<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ loginTitle }}</h3>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="账号登录" name="byUsername">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
              <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
              @keyup.enter.native="handleLogin">
              <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaLock" v-show="captchaType === 0">
            <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
              @keyup.enter.native="handleLogin">
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
              @click.native.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div style="float: right;" v-if="registerLock">
              <router-link class="link-type" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="byEmail">
          <el-form-item prop="email">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
              <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="byPhone">
          手机登录
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>{{ copyright }}</span>
    </div>
  </div>
</template>

<script>

import { getCaptcha } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      activeTab: "byUsername",
      captchaType: undefined,
      loginTitle: process.env.VUE_APP_LOGIN_TITLE,
      copyright: process.env.VUE_APP_COPYRIGHT,
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "123456",
        rememberMe: false,
        loginType: "username",
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      },
      loginFormByEmail: {
        email: "",
        validCode: "123456",
        loginType: "email",
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      },
      loginFormByPhone: {
        phone: "",
        validCode: "123456",
        loginType: "phone",
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      },
      loginRules1: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ]
      },
      loginRules2: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ]
      },
      loading: false,
      // 验证码开关
      captchaLock: true,
      // 注册开关
      registerLock: true,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    /**
     * 获取腾讯滑块
     */
    getSliderCaptcha() {
      var captcha = new TencentCaptcha('2090581062', this.callback, {});
      captcha.show();
    },
    callback(res) {
      // 第一个参数传入回调结果，结果如下：
      // ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。
      // ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
      // CaptchaAppId       String    验证码应用ID。
      // bizState    Any       自定义透传参数。
      // randstr     String    本次验证的随机串，后续票据校验时需传递该参数。
      if (res.ret === 0) {
        this.loginForm.randStr = res.randstr;
        this.loginForm.ticket = res.ticket;
        this.doLogin()
      }
    },
    getCode() {
      getCaptcha().then(res => {
        this.captchaLock = res.data.captchaLock === undefined ? true : res.data.captchaLock;
        if (this.captchaLock) {
          this.captchaType = res.data.captchaType;
          if (res.data.captchaType === 0) {
            //图片验证码
            this.codeUrl = "data:image/gif;base64," + res.data.image.img;
            this.loginForm.uuid = res.data.image.uuid;
          } else if (res.data.captchaType === 1) {
            //滑块验证码
            this.loginForm.uuid = res.data.slider.uuid;
          }
        }
      }).catch(() => {
        this.codeUrl = "data:image/gif;base64,xxx";
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        loginType: this.loginForm.loginType === undefined ? "account" : this.loginForm.loginType
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.captchaLock) {
            if (this.captchaType === 1) {
              this.getSliderCaptcha()
            } else {
              if (!this.loginForm.code || this.loginForm.code.length == 0) {
                this.$modal.msgError("请输入验证码");
                return;
              }
              this.doLogin()
            }
          } else {
            this.doLogin()
          }
        }
      });
    },
    doLogin() {
      this.loading = true;
      if (this.loginForm.rememberMe) {
        Cookies.set("username", this.loginForm.username, { expires: 30 });
        Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
        Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove('rememberMe');
      }
      this.$store.dispatch("Login", this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || "/" }).catch(() => {
        });
      }).catch(() => {
        this.loading = false;
        if (this.captchaLock) {
          this.getCode();
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.png");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
