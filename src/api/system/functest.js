import request from '@/utils/request'


// 测试邮件发送
export function sendEmail(data) {
  return request({
    url: '/system/functest/sendEmail',
    method: 'post',
    data: data
  })
}

// 测试短信发送
export function sendSms(data) {
  return request({
    url: '/system/functest/sendSms',
    method: 'post',
    data: data
  })
}
