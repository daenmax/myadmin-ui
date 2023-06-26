import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor/logOper/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delLogOper(ids) {
  return request({
    url: '/monitor/logOper/remove',
    method: 'post',
    data: ids
  })
}

// 清空操作日志
export function cleanLogOper() {
  return request({
    url: '/monitor/logOper/clean',
    method: 'post'
  })
}
