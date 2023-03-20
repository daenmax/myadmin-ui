<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>账号信息</span>
          </div>
          <div>
            欢迎您
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />UID
                <div class="pull-right">{{ user.id }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户账号
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />用户类型
                <div class="pull-right">{{ user.userTypeName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div class="pull-right" v-if="user.deptName">{{ user.deptName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属岗位
                <div class="pull-right">{{ postGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />账户余额
                <div class="pull-right">￥{{ user.money }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />注册日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />过期日期
                <div class="pull-right">{{ user.expireToTime==null?"永久":user.banToTime }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />解封日期
                <div class="pull-right">{{ user.banToTime==null?"正常":user.banToTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户昵称
                <div class="pull-right">{{ user.nickName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />真实姓名
                <div class="pull-right">{{ user.realName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户性别
                <div class="pull-right">{{ user.sex==1?"男":(user.age==0?"女":"未知") }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户年龄
                <div class="pull-right">{{ user.age }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ user.phone }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />个人说明
                <div class="pull-right"><span>{{ user.profile }}</span></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />个人签名
                <div class="pull-right">{{ user.userSign }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>信息修改</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="个人资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo"
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data.user;
        this.roleGroup = response.data.roleGroup;
        this.postGroup = response.data.postGroup;
      });
    }
  }
};
</script>
