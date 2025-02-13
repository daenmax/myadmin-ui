import request from '@/utils/request'

// 获取验证码
export function captcha() {
  return request({
    url: '/captcha',
    headers: {
      ignoreToken: true
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取邮箱验证码
export function getEmailValidCode(data) {
  return request({
    url: '/getEmailValidCode',
    headers: {
      ignoreToken: true
    },
    method: 'post',
    data: data
  })
}

// 获取手机验证码
export function getPhoneValidCode(data) {
  return request({
    url: '/getPhoneValidCode',
    headers: {
      ignoreToken: true
    },
    method: 'post',
    data: data
  })
}

// 登录方法
export function login(data) {
  return request({
    url: '/login',
    headers: {
      //是否忽略token，不填写此参数的话，默认是false。
      //false是不忽略，即接口需要带上token
      //true是忽略token，即不登录也能调用的接口
      ignoreToken: true
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      ignoreToken: true
    },
    method: 'post',
    data: data
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


