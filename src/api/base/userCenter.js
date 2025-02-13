import request from '@/utils/request'


// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/userCenter/getInfo',
    method: 'get'
  })
}

// 获取路由
export const getRouters = () => {
  return request({
    url: '/userCenter/getRouters',
    method: 'get'
  })
}

// 查询用户个人信息
export function getProfile() {
  return request({
    url: '/userCenter/getProfile',
    method: 'get'
  })
}

// 修改用户个人信息
export function editProfile(data) {
  return request({
    url: '/userCenter/editProfile',
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
export function editPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/userCenter/editPwd',
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function editAvatar(data) {
  return request({
    url: '/userCenter/editAvatar',
    method: 'post',
    data: data
  })
}


// 获取邮箱验证码
export function getEmailValidCode(data) {
  return request({
    url: '/userCenter/getEmailValidCode',
    method: 'post',
    data: data
  })
}

// 获取手机验证码
export function getPhoneValidCode(data) {
  return request({
    url: '/userCenter/getPhoneValidCode',
    method: 'post',
    data: data
  })
}


// 修改邮箱绑定
export function updateBindEmail(data) {
  return request({
    url: '/userCenter/updateBindEmail',
    method: 'post',
    data: data
  })
}

// 修改手机绑定
export function updateBindPhone(data) {
  return request({
    url: '/userCenter/updateBindPhone',
    method: 'post',
    data: data
  })
}
