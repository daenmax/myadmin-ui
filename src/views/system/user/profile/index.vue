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
                <svg-icon icon-class="star" /> 用户UID
                <div class="pull-right"><el-tag type="info" size="mini" >{{ user.id }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" /> 用户账号
                <div class="pull-right"><el-tag type="success" size="mini" :hit="true">{{ user.username }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="theme" /> 用户类型
                <div class="pull-right"><el-tag type="success" size="mini">{{ user.userTypeName }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" /> 所属部门
                <div class="pull-right" v-if="user.deptName"><el-tag type="" size="mini">{{ user.deptName }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree-table" /> 所属岗位
                <div class="pull-right"><el-tag v-for="(item,index) in postGroup" :key="index" type="" size="mini"  style="margin-left: 10px;">{{ item }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" /> 所属角色
                <div class="pull-right"><el-tag v-for="(item,index) in roleGroup" :key="index" type="" size="mini"   style="margin-left: 10px;">{{ item }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="money" /> 账户余额
                <div class="pull-right"><el-tag type="danger" size="mini">{{ user.money}}元</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 注册日期
                <div class="pull-right"><el-tag type="warning" size="mini">{{ user.createTime }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 过期日期
                <div class="pull-right"><el-tag type="warning" size="mini">{{ user.expireToTime==null?"永久":user.banToTime }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 解封日期
                <div class="pull-right"><el-tag type="danger" size="mini">{{ user.banToTime==null?"正常":user.banToTime }}</el-tag></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="form" /> 备注
                <div class="pull-right">{{ user.remark }}</div>
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
                <svg-icon icon-class="dashboard" /> 用户昵称
                <div class="pull-right">{{ user.nickName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" /> 真实姓名
                <div class="pull-right">{{ user.realName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="example" /> 用户性别
                <div class="pull-right">{{ user.sex==1?"男":(user.age==0?"女":"未知") }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="guide" /> 用户年龄
                <div class="pull-right">{{ user.age }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" /> 手机号码
                <div class="pull-right">{{ user.phone }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" /> 用户邮箱
                <div class="pull-right"><el-link :href="'mailto:' + user.email" type="primary">{{ user.email }}</el-link></div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="message" /> 个人签名
                <div class="pull-right">{{ user.userSign }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="documentation" /> 个人说明
                <div class="pull-right">{{ user.profile }}</div>
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
            <el-tab-pane label="账号绑定" name="userbind">
              <userbind :bind="bind" />
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
import userbind from "./userbind";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";
import { regFenToYuan } from '@/utils/myUtil'

export default {
  name: "Profile",
  components: { userAvatar, userInfo, userbind, resetPwd },
  data() {
    return {
      user: {},
      bind: {
        phone: undefined,
        email: undefined
      },
      roleGroup: {},
      postGroup: [],
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
        this.user.money = regFenToYuan(this.user.money);
        this.roleGroup = response.data.roleGroup;
        this.postGroup = response.data.postGroup;
        this.bind.phone = response.data.user.phone;
        this.bind.email = response.data.user.email;
      });
    }
  }
};
</script>
