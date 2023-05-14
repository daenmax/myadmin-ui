<template>
  <el-form ref="form" :model="bind" :rules="rules" label-width="80px">

    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="bind.phone" maxlength="11" show-word-limit/>
    </el-form-item>
    <el-form-item label="验证码" prop="phoneCode">
      <el-input v-model="bind.phoneCode" maxlength="6" show-word-limit/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="info" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    bind: {
      type: Object
    }
  },

  data() {
    return {
      // 表单校验
      rules: {
        phone: [
          { required: false, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserProfile(this.bind).then(response => {
            this.$modal.msgSuccess("修改成功");
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
