import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid, loginType) {
  const data = {
    username,
    password,
    code,
    uuid,
    loginType
  }
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

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      ignoreToken: true
    },
    method: 'get',
    timeout: 20000
  })
}

// 短信验证码
export function getCodeSms() {
  return request({
    url: '/captchaSms',
    headers: {
      ignoreToken: true
    },
    method: 'get',
    timeout: 20000
  })
}
