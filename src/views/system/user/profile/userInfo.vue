<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称" prop="nickName">
      <el-input v-model="user.nickName" maxlength="50" show-word-limit/>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="user.realName" maxlength="30" show-word-limit/>
    </el-form-item>
    <el-form-item label="用户性别">
      <el-radio-group v-model="user.sex">
        <el-radio label="0">女</el-radio>
        <el-radio label="1">男</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户年龄" prop="age">
      <el-input-number v-model="user.age" controls-position="right" :min="0" :max="200"/>
    </el-form-item>
    <el-form-item label="个人签名" prop="userSign">
      <el-input v-model="user.userSign" maxlength="50" show-word-limit/>
    </el-form-item>
    <el-form-item label="个人说明" prop="profile">
      <el-input type="textarea" v-model="user.profile" maxlength="100" show-word-limit/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserProfile(this.user).then(response => {
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
