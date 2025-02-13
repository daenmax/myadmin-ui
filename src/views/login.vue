<template>
  <div class="login">
    <div class="login-form">
      <h3 class="title">{{ loginTitle }}</h3>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="账号登录" name="byUsername">
          <el-form ref="loginForm" :model="loginForm" :rules="usernameRules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号 / 邮箱 / 手机">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                        @keyup.enter.native="handleLogin">
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="captchaLock" v-show="captchaType === 0">
              <el-input v-model="captchaForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
                        @keyup.enter.native="handleLogin">
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img"/>
              </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                         @click.native.prevent="handleLogin">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="byEmail">
          <el-form ref="loginFormByEmail" :model="loginFormByEmail" :rules="emailRules">
            <el-form-item prop="email">
              <el-input v-model="loginFormByEmail.email" type="text" auto-complete="off" placeholder="邮箱">
                <svg-icon slot="prefix" icon-class="email" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="captchaLock" v-show="captchaType === 0">
              <el-input v-model="captchaForm.code" auto-complete="off" placeholder="验证码" style="width: 63%">
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img"/>
              </div>
            </el-form-item>
            <el-form-item prop="validCode">
              <el-row :gutter="4">
                <el-col :span="16">
                  <el-input v-model="loginFormByEmail.validCode" type="text" auto-complete="off"
                            placeholder="邮箱验证码">
                    <svg-icon slot="prefix" icon-class="code" class="el-input__icon input-icon"/>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" :disabled="disabledEmail" @click="handleGetCodeEmail">{{ getEmailCodeStr }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                         @click.native.prevent="handleLoginByEmail">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="byPhone">
          <el-form ref="loginFormByPhone" :model="loginFormByPhone" :rules="phoneRules">
            <el-form-item prop="phone">
              <el-input v-model="loginFormByPhone.phone" type="text" auto-complete="off" placeholder="手机号">
                <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="captchaLock" v-show="captchaType === 0">
              <el-input v-model="captchaForm.code" auto-complete="off" placeholder="验证码" style="width: 63%">
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img"/>
              </div>
            </el-form-item>
            <el-form-item prop="validCode">
              <el-row :gutter="4">
                <el-col :span="16">
                  <el-input v-model="loginFormByPhone.validCode" type="text" auto-complete="off"
                            placeholder="短信验证码">
                    <svg-icon slot="prefix" icon-class="code" class="el-input__icon input-icon"/>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" :disabled="disabledPhone" @click="handleGetCodePhone">{{ getPhoneCodeStr }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                         @click.native.prevent="handleLoginByPhone">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div style="float: right;" v-if="registerLock">
        <router-link class="link-type" :to="'/register'">立即注册</router-link>
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>{{ copyright }}</span>
    </div>
  </div>
</template>

<script>

import {captcha, getEmailValidCode, getPhoneValidCode} from "@/api/base/login";
import Cookies from "js-cookie";
import {encrypt, decrypt} from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      activeTab: "byUsername",
      getEmailCodeStr: '发送验证码',
      disabledEmail: false,
      getPhoneCodeStr: '发送验证码',
      disabledPhone: false,
      captchaType: undefined,
      loginTitle: process.env.VUE_APP_LOGIN_TITLE,
      copyright: process.env.VUE_APP_COPYRIGHT,
      codeUrl: "",
      captchaForm: {
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      },
      loginForm: {
        username: "admin",
        password: "123456",
        rememberMe: false,
        loginType: "username"
      },
      loginFormByEmail: {
        uuidSign: "",
        email: "",
        validCode: "",
        loginType: "email"
      },
      loginFormByPhone: {
        uuidSign: "",
        phone: "",
        validCode: "",
        loginType: "phone"
      },
      usernameRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ]
      },
      emailRules: {
        email: [
          {required: true, message: "邮箱不能为空", trigger: "blur"},
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur", "change"]
          }
        ],
        validCode: [
          {required: true, trigger: "blur", message: "请输入收到的邮箱验证码"}
        ],
      },
      phoneRules: {
        phone: [
          {required: false, message: "手机号码不能为空", trigger: "blur"},
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ], validCode: [
          {required: true, trigger: "blur", message: "请输入收到的短信验证码"}
        ],
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
        this.captchaForm.randStr = res.randstr;
        this.captchaForm.ticket = res.ticket;
        if (this.activeTab === "byUsername") {
          this.doLogin()
        }
        if (this.activeTab === "byEmail") {
          this.getEmailCode()
        }
        if (this.activeTab === "byPhone") {
          this.getPhoneCode()
        }
      }
    },
    getCode() {
      captcha().then(res => {
        this.captchaLock = res.data.captchaLock === undefined ? true : res.data.captchaLock;
        if (this.captchaLock) {
          this.captchaType = res.data.captchaType;
          if (res.data.captchaType === 0) {
            //图片验证码
            this.codeUrl = "data:image/gif;base64," + res.data.image.img;
            this.captchaForm.uuid = res.data.image.uuid;
          } else if (res.data.captchaType === 1) {
            //滑块验证码
            this.captchaForm.uuid = res.data.slider.uuid;
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
      this.loginForm.username=username;
      this.loginForm.password=decrypt(password);
      this.loginForm.rememberMe=Boolean(rememberMe);
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.captchaLock) {
            if (this.captchaType === 1) {
              this.getSliderCaptcha()
            } else {
              if (!this.captchaForm.code || this.captchaForm.code.length == 0) {
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
    handleLoginByEmail() {
      this.$refs.loginFormByEmail.validate(valid => {
        if (valid) {
          this.doLogin()
        }
      });
    },
    handleGetCodeEmail() {
      if (this.captchaLock) {
        if (this.captchaType === 1) {
          if (!this.loginFormByEmail.email || this.loginFormByEmail.email.length == 0) {
            this.$modal.msgError("请输入邮箱");
            return;
          }
          this.getSliderCaptcha()
        } else {
          if (!this.loginFormByEmail.email || this.loginFormByEmail.email.length == 0) {
            this.$modal.msgError("请输入邮箱");
            return;
          }
          if (!this.captchaForm.code || this.captchaForm.code.length == 0) {
            this.$modal.msgError("请输入验证码");
            return;
          }
          this.getEmailCode()
        }
      } else {
        this.getEmailCode()
      }
    },
    getEmailCode() {
      getEmailValidCode({...this.captchaForm, ...this.loginFormByEmail}).then(res => {
        let time = res.data.waitTime;
        this.loginFormByEmail.uuidSign = this.captchaForm.uuid
        this.loginFormByPhone.uuidSign = this.captchaForm.uuid
        clearInterval(this.timerEmail)
        this.timerEmail = setInterval(() => {
          if (time == 0) {
            clearInterval(this.timer);
            this.getEmailCodeStr = '发送验证码';
            this.disabledEmail = false;
          } else {
            this.getEmailCodeStr = time + '秒后重试';
            this.disabledEmail = true;
            time--;
          }
        }, 1000);
        this.$modal.msgSuccess(res.data.msg);
      }).catch(() => {
        if (this.captchaLock) {
          this.getCode();
        }
      })

    },
    handleLoginByPhone() {
      this.$refs.loginFormByPhone.validate(valid => {
        if (valid) {
          this.doLogin()
        }
      });
    },
    handleGetCodePhone() {
      if (this.captchaLock) {
        if (this.captchaType === 1) {
          if (!this.loginFormByPhone.phone || this.loginFormByPhone.phone.length == 0) {
            this.$modal.msgError("请输入手机号");
            return;
          }
          this.getSliderCaptcha()
        } else {
          if (!this.loginFormByPhone.phone || this.loginFormByPhone.phone.length == 0) {
            this.$modal.msgError("请输入手机号");
            return;
          }
          if (!this.captchaForm.code || this.captchaForm.code.length == 0) {
            this.$modal.msgError("请输入验证码");
            return;
          }
          this.getPhoneCode()
        }
      } else {
        this.getPhoneCode()
      }
    },
    getPhoneCode() {
      getPhoneValidCode({...this.captchaForm, ...this.loginFormByPhone}).then(res => {
        let time = res.data.waitTime;
        this.loginFormByPhone.uuidSign = this.captchaForm.uuid
        this.loginFormByPhone.uuidSign = this.captchaForm.uuid
        clearInterval(this.timerPhone)
        this.timerPhone = setInterval(() => {
          if (time == 0) {
            clearInterval(this.timer);
            this.getPhoneCodeStr = '发送验证码';
            this.disabledPhone = false;
          } else {
            this.getPhoneCodeStr = time + '秒后重试';
            this.disabledPhone = true;
            time--;
          }
        }, 1000);
        this.$modal.msgSuccess(res.data.msg);
      }).catch(() => {
        if (this.captchaLock) {
          this.getCode();
        }
      })

    },
    doLogin() {
      this.loading = true;
      if (this.loginForm.rememberMe) {
        Cookies.set("username", this.loginForm.username, {expires: 30});
        Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
        Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove('rememberMe');
      }
      let loginBody = this.captchaForm;
      if (this.activeTab === "byUsername") {
        loginBody.username = this.loginForm.username;
        loginBody.password = this.loginForm.password;
        loginBody.loginType = this.loginForm.loginType;
      }
      if (this.activeTab === "byEmail") {
        loginBody.email = this.loginFormByEmail.email;
        loginBody.validCode = this.loginFormByEmail.validCode;
        loginBody.loginType = this.loginFormByEmail.loginType;
        loginBody.uuid = this.loginFormByEmail.uuidSign;
      }
      if (this.activeTab === "byPhone") {
        loginBody.phone = this.loginFormByPhone.phone;
        loginBody.validCode = this.loginFormByPhone.validCode;
        loginBody.loginType = this.loginFormByPhone.loginType;
        loginBody.uuid = this.loginFormByPhone.uuidSign;
      }
      console.log(loginBody)
      this.$store.dispatch("Login", loginBody).then(() => {
        this.$router.push({path: this.redirect || "/"}).catch(() => {
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
