import request from '@/utils/request'

// 导出
export const exportData =  '/monitor/jobLog/exportData'

// 查询调度日志列表
export function page(query) {
  return request({
    url: '/monitor/jobLog/page',
    method: 'get',
    params: query
  })
}

// 删除调度日志
export function del(ids) {
  return request({
    url: '/monitor/jobLog/del',
    method: 'post',
    data: ids
  })
}

// 清空调度日志
export function clean() {
  return request({
    url: '/monitor/jobLog/clean',
    method: 'post'
  })
}
