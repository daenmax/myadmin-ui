<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">{{ registerTitle }}</h3>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" auto-complete="off" placeholder="密码"
                  @keyup.enter.native="handleRegister">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" auto-complete="off" placeholder="确认密码"
                  @keyup.enter.native="handleRegister">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaLock" v-show="captchaType===0">
        <el-input v-model="registerForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
                  @keyup.enter.native="handleRegister">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                   @click.native.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-register-footer">
      <span>{{ copyright }}</span>
    </div>
  </div>
</template>

<script>
import {getCaptcha, register} from "@/api/login";

export default {
  name: "Register",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      captchaType: undefined,
      registerTitle: process.env.VUE_APP_REGISTER_TITLE,
      copyright: process.env.VUE_APP_COPYRIGHT,
      codeUrl: "",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      },
      registerRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"},
          {min: 5, max: 30, message: '用户账号长度必须介于 5 和 30 之间', trigger: 'blur'}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"},
          {min: 6, max: 16, message: '用户密码长度必须介于 6 和 16 之间', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, trigger: "blur", message: "请再次输入您的密码"},
          {required: true, validator: equalToPassword, trigger: "blur"}
        ]
      },
      loading: false,
      captchaLock: true
    };
  },
  created() {
    this.getCode();
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
        this.registerForm.randStr = res.randstr;
        this.registerForm.ticket = res.ticket;
        this.doRegister()
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
            this.registerForm.uuid = res.data.image.uuid;
          } else if (res.data.captchaType === 1) {
            //滑块验证码（待实现）
          } else if (res.data.captchaType === 2) {
            //文字点选验证码（待实现）
          }
        }
      }).catch(() => {
        this.codeUrl = "data:image/gif;base64,xxx";
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if(this.captchaLock){
            if (this.captchaType === 1) {
              this.getSliderCaptcha()
            } else {
              if (!this.registerForm.code || this.registerForm.code.length == 0) {
                this.$modal.msgError("请输入验证码");
                return;
              }
              this.doRegister()
            }
          }else {
            this.doRegister()
          }
        }
      });
    },
    doRegister() {
      this.loading = true;
      let registerForm = this.registerForm;
      register(registerForm).then(res => {
        const username = this.registerForm.username;
        this.$alert("<font color='red'>您的账号 " + username + " 注册成功！</font>", '系统提示', {
          dangerouslyUseHTMLString: true,
          type: 'success'
        }).then(() => {
          this.$router.push("/login");
        }).catch(() => {
        });
      }).catch(() => {
        this.loading = false;
        if (this.captchaLock) {
          this.getCode();
        }
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
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

.register-form {
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

.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.register-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-register-footer {
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

.register-code-img {
  height: 38px;
}
</style>
