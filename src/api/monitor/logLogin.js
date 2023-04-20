import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/monitor/logLogin/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogLogin(ids) {
  return request({
    url: '/monitor/logLogin',
    method: 'delete',
    data: ids
  })
}

// 清空登录日志
export function cleanLogLogin() {
  return request({
    url: '/monitor/logLogin/clean',
    method: 'delete'
  })
}
