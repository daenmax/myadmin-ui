<template>
  <el-form ref="form" :model="bind" :rules="rules" label-width="80px">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="bind.email" maxlength="50" show-word-limit/>
    </el-form-item>
    <el-row :gutter="10" v-if="captchaLock" v-show="captchaType===0">
      <el-col :span="18">
        <el-form-item label="人机验证" prop="code">
          <el-input v-model="changeForm.code" auto-complete="off" placeholder="图片验证码" maxlength="6"
                    show-word-limit/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <div class="imageCaptcha-code">
          <img :src="codeUrl" @click="getCode" class="imageCaptcha-code-img"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="18">
        <el-form-item label="验证码" prop="emailCode">
          <el-input v-model="changeForm.validCode" maxlength="6" show-word-limit/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :disabled="disabled" @click="handleGetCode">{{ getCodeStr }}</el-button>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateBindEmail, getEmailValidCode} from "@/api/system/user";
import {getCaptcha} from "@/api/login";

export default {
  props: {
    bind: {
      type: Object
    }
  },

  data() {
    return {
      captchaType: undefined,
      captchaLock: true,
      // 表单校验
      rules: {
        email: [
          {required: false, message: "邮箱地址不能为空", trigger: "blur"},
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      timer: '',
      codeUrl: "",
      getCodeStr: '发送验证码',
      disabled: false,
      changeForm: {
        validCode: "",
        code: "",
        uuid: "",
        randStr: "",
        ticket: ""
      }
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
        this.changeForm.randStr = res.randstr;
        this.changeForm.ticket = res.ticket;
        this.getEmailCode()
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
            this.changeForm.uuid = res.data.image.uuid;
          } else if (res.data.captchaType === 1) {
            //滑块验证码
            this.changeForm.uuid = res.data.slider.uuid;
          }
        }
      }).catch(() => {
        this.codeUrl = "data:image/gif;base64,xxx";
      });
    },
    handleGetCode() {
      if (this.captchaLock) {
        if (this.captchaType === 1) {
          if (!this.bind.email || this.bind.email.length == 0) {
            this.$modal.msgError("请输入邮箱");
            return;
          }
          this.getSliderCaptcha()
        } else {
          if (!this.bind.email || this.bind.email.length == 0) {
            this.$modal.msgError("请输入邮箱");
            return;
          }
          if (!this.changeForm.code || this.changeForm.code.length == 0) {
            this.$modal.msgError("请输入人机验证图片验证码");
            return;
          }
          this.getEmailCode()
        }
      } else {
        this.getEmailCode()
      }

    },
    getEmailCode() {
      getEmailValidCode({...this.bind, ...this.changeForm}).then(res => {
        let time = res.data.waitTime;
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (time == 0) {
            clearInterval(this.timer);
            this.getCodeStr = '发送验证码';
            this.disabled = false;
          } else {
            this.disabled = true;
            this.getCodeStr = time + '秒后重试';
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
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateBindEmail({...this.bind, ...this.changeForm}).then(response => {
            this.$modal.msgSuccess(response.data.msg);
          }).catch(() => {
            if (this.captchaLock) {
              this.getCode();
            }
          });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.imageCaptcha-code {
  width: 33%;
  height: 38px;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.imageCaptcha-code-img {
  height: 38px;
}
</style>
