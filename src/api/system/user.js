import request from '@/utils/request'
import {parseStrEmpty} from "@/utils/ruoyi";

// 查询用户列表
export function pageUser(query) {
  return request({
    url: '/system/user/page',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/system/user/' + parseStrEmpty(id),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user/add',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user/edit',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delUser(ids) {
  return request({
    url: '/system/user/remove',
    method: 'post',
    data: ids
  })
}

// 用户密码重置
export function resetUserPwd(id, password) {
  const data = {
    id,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'post',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'post',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/editProfile',
    headers: {
      //是否忽略POST和PUT的重复提交限制，不填写此参数的话，默认是false。
      //false是不忽略限制，不允许重复
      //true是忽略限制，允许重复
      ignoreRepeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/updatePwd',
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(id) {
  return request({
    url: '/system/user/authRole/' + id,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'post',
    data: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/system/user/deptTree',
    method: 'get'
  })
}

// 获取邮箱验证码
export function getEmailValidCode(data) {
  return request({
    url: '/system/user/getEmailValidCode',
    method: 'post',
    data: data
  })
}

// 获取手机验证码
export function getPhoneValidCode(data) {
  return request({
    url: '/system/user/getPhoneValidCode',
    method: 'post',
    data: data
  })
}


// 修改邮箱绑定
export function updateBindEmail(data) {
  return request({
    url: '/system/user/updateBindEmail',
    method: 'post',
    data: data
  })
}

// 修改手机绑定
export function updateBindPhone(data) {
  return request({
    url: '/system/user/updateBindPhone',
    method: 'post',
    data: data
  })
}
