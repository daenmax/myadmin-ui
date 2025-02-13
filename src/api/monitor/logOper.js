import request from '@/utils/request'

// 导出
export const exportData =  '/monitor/logOper/exportData'

// 查询操作日志列表
export function page(query) {
  return request({
    url: '/monitor/logOper/page',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function del(ids) {
  return request({
    url: '/monitor/logOper/del',
    method: 'post',
    data: ids
  })
}

// 清空操作日志
export function clean() {
  return request({
    url: '/monitor/logOper/clean',
    method: 'post'
  })
}
