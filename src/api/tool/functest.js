import request from '@/utils/request'


// 测试邮件发送
export function sendEmail(data) {
  return request({
    url: '/tool/functest/sendEmail',
    method: 'post',
    data: data
  })
}

// 测试短信发送
export function sendSms(data) {
  return request({
    url: '/tool/functest/sendSms',
    method: 'post',
    data: data
  })
}

// 测试钉钉发送
export function sendDingTalk(data) {
  return request({
    url: '/tool/functest/sendDingTalk',
    method: 'post',
    data: data
  })
}
