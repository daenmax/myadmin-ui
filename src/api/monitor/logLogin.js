import request from '@/utils/request'

// 导出
export const exportData =  '/monitor/logLogin/exportData'

// 查询登录日志列表
export function page(query) {
  return request({
    url: '/monitor/logLogin/page',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function del(ids) {
  return request({
    url: '/monitor/logLogin/del',
    method: 'post',
    data: ids
  })
}

// 清空登录日志
export function clean() {
  return request({
    url: '/monitor/logLogin/clean',
    method: 'post'
  })
}
