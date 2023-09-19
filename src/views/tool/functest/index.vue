<template>
  <div class="app-container">
    <el-row :gutter="20" style="padding-bottom: 10px">

      <el-col :span="8" :xs="24" v-hasPermi="['tool:functest:sendEmail']">
        <el-form label-width="96px" ref="sendEmailForm" :model="sendEmailForm" :rules="rulesEmail">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>邮箱测试</span>
            </div>
            <div>
              <el-form-item label="使用邮箱" prop="formEmail">
                <el-input v-model="sendEmailForm.formEmail" placeholder="使用哪个邮箱进行发送（可空）" clearable/>
              </el-form-item>
              <el-form-item label="接收邮箱" prop="toEmail">
                <el-input v-model="sendEmailForm.toEmail" placeholder="要发到哪个邮箱" clearable/>
              </el-form-item>
              <el-form-item label="邮件主题" prop="subject">
                <el-input v-model="sendEmailForm.subject" placeholder="邮件主题" clearable/>
              </el-form-item>
              <el-form-item label="邮件正文" prop="content">
                <el-input type="textarea" v-model="sendEmailForm.content" placeholder="邮件正文" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="float: right;width: 100px" @click="sendEmailHandle"
                           :loading="sendEmailLoading">发送
                </el-button>
              </el-form-item>

            </div>
          </el-card>
        </el-form>
      </el-col>

      <el-col :span="8" :xs="24" v-hasPermi="['tool:functest:sendSms']">
        <el-form label-width="96px" ref="sendSmsForm" :model="sendSmsForm" :rules="rulesSms">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>短信测试</span>
            </div>
            <div>
              <el-form-item label="短信平台" prop="type">
                <el-input v-model="sendSmsForm.type" placeholder="例如：aliyun、tencent" clearable/>
              </el-form-item>
              <el-form-item label="模板ID" prop="templateId">
                <el-input v-model="sendSmsForm.templateId" placeholder="模板ID" clearable/>
              </el-form-item>
              <el-form-item prop="invokeTarget">
              <span slot="label">
                手机号
                <el-tooltip placement="top">
                  <div slot="content">
                    手机号，多个用英文逗号,隔开
                    <br/>以下两个是框架已经内置实现了的厂商平台说明
                    <br/>使用腾讯云时，每个手机号必须加前缀，例如+86，单次最多支持200个手机号
                    <br/>使用阿里云时，前缀加不加都可以，默认是+86，单次最多支持1000个手机号
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
                <el-row :gutter="20" class="phone-input-item">
                  <el-col :span="20" v-for="(item,index) in phones" :key="index" style="padding-bottom: 8px;">
                    <el-input v-model="item.value" placeholder="手机号码" clearable/>
                  </el-col>
                  <el-col :span="3">
                    <i @click="addPhone" class="el-icon-circle-plus-outline"></i>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item prop="invokeTarget">
              <span slot="label">
                kv
                <el-tooltip placement="top">
                  <div slot="content">
                    什么是kv，就是参数和值，多个参数就点+号增加一行
                    <br/>以下两个是框架已经内置实现了的厂商平台说明
                    <br/>腾讯云时，例如模板为：验证码为：{1}，有效期为{2}分钟，如非本人操作，请忽略本短信。那么key=1，value=6666，key=2，value=5
                    <br/>阿里云时，例如模板为：您的验证码为：${code}，请勿泄露于他人！那么key=code，value=1234
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
                <el-row :gutter="5">
                 <span v-for="(item,index) in kvs" :key="index" class="kvs-input-item">
                    <el-col :span="9">
                    <el-input type="text" v-model="item.value1" placeholder="参数（key）" clearable/>
                  </el-col>
                  <el-col :span="1">
                    -
                  </el-col>
                  <el-col :span="9">
                    <el-input type="text" v-model="item.value2" placeholder="值（value）" clearable/>
                  </el-col>
                 </span>
                  <el-col :span="3">
                    <i @click="addkv" class="el-icon-circle-plus-outline"></i>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="float: right;width: 100px" @click="sendSmsHandle"
                           :loading="sendSmsLoading">发送
                </el-button>
              </el-form-item>

            </div>
          </el-card>
        </el-form>
      </el-col>


      <el-col :span="8" :xs="24" v-hasPermi="['tool:functest:sendDingTalk']">
        <el-form label-width="96px" ref="sendDingTalkForm" :model="sendDingTalkForm" :rules="rulesDingTalk">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>钉钉测试</span>
            </div>
            <div>
              <el-form-item label="机器人名称" prop="botName">
                <el-input v-model="sendDingTalkForm.botName" placeholder="在系统参数里自己填的" clearable/>
              </el-form-item>
              <el-form-item label="消息内容" prop="msg">
                <el-input type="textarea" v-model="sendDingTalkForm.msg" placeholder="消息内容" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="float: right;width: 100px" @click="sendDingTalkHandle"
                           :loading="sendDingTalkLoading">发送
                </el-button>
              </el-form-item>

            </div>
          </el-card>
        </el-form>
      </el-col>

    </el-row>


  </div>
</template>

<script>

import {sendEmail, sendSms, sendDingTalk} from "@/api/tool/functest";

export default {
  name: "Functest",
  data() {
    return {
      sendEmailLoading: false,
      sendEmailForm: {
        formEmail: undefined,
        toEmail: undefined,
        subject: undefined,
        content: undefined
      },
      rulesEmail: {
        toEmail: [
          {required: true, message: "接收邮箱不能为空", trigger: "blur"}
        ],
        subject: [
          {required: true, message: "主题不能为空", trigger: "change"}
        ],
        content: [
          {required: true, message: "内容不能为空", trigger: "change"}
        ]
      },

      kvs: [{value1: '', value2: ''}],
      phones: [{value: ''}],
      sendSmsLoading: false,
      sendSmsForm: {
        type: undefined,
        phones: undefined,
        templateId: undefined,
        kv: undefined
      },
      rulesSms: {
        // phones: [
        //   {required: true, message: "接收手机号不能为空", trigger: "blur"}
        // ],
        templateId: [
          {required: true, message: "模板ID不能为空", trigger: "change"}
        ],
        // kv: [
        //   {required: true, message: "kv不能为空", trigger: "change"}
        // ]
      },

      sendDingTalkLoading: false,
      sendDingTalkForm: {
        botName: undefined,
        msg: undefined
      },
      rulesDingTalk: {
        botName: [
          {required: true, message: "机器人名称不能为空", trigger: "blur"}
        ],
        msg: [
          {required: true, message: "消息内容不能为空", trigger: "change"}
        ],
        content: [
          {required: true, message: "内容不能为空", trigger: "change"}
        ]
      },
    };
  },
  created() {

  },
  methods: {

    //发送邮件
    sendEmailHandle: function () {
      this.$refs.sendEmailForm.validate(valid => {
        if (valid) {
          this.sendEmailLoading = true;
          sendEmail(this.sendEmailForm).then(response => {
            this.sendEmailLoading = false;
            this.$modal.msgSuccess(response.msg);
          }).catch(() => {
            this.sendEmailLoading = false;
          });
        }
      });
    },

    addkv() {
      this.kvs.push({value1: '', value2: ''})
    },
    addPhone() {
      this.phones.push({value: ''})
    },
    //发送短信
    sendSmsHandle: function () {
      let phone = []
      let kvs = []
      this.phones.forEach(item => {
        if (item.value.length > 0) phone.push(item.value)
      })
      this.kvs.forEach(item => {
        if (item.value1.length > 0 && item.value2.length > 0) kvs.push(`${item.value1}-${item.value2}`)
      })
      console.log(phone, kvs, 'phone')
      this.sendSmsForm.phones = phone;
      this.sendSmsForm.kv = kvs;
      this.$refs.sendSmsForm.validate(valid => {
        if (valid) {
          this.sendSmsLoading = true;
          sendSms(this.sendSmsForm).then(response => {
            this.sendSmsLoading = false;
            this.$modal.msgSuccess(response.msg);
          }).catch(() => {
            this.sendSmsLoading = false;
          });
        }
      });
    },

    //发送钉钉
    sendDingTalkHandle: function () {
      this.$refs.sendDingTalkForm.validate(valid => {
        if (valid) {
          this.sendDingTalkLoading = true;
          sendDingTalk(this.sendDingTalkForm).then(response => {
            this.sendDingTalkLoading = false;
            this.$modal.msgSuccess(response.msg);
          }).catch(() => {
            this.sendDingTalkLoading = false;
          });
        }
      });
    },
  }
};
</script>
<style scoped>
.el-icon-circle-plus-outline {
  font-size: 28px;
}

.phone-input-item .el-col:nth-child(1) {
  position: relative;
  left: -10px;
}

.kvs-input-item {
  line-height: 45px;
}
</style>
