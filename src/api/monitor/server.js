import request from '@/utils/request'

// 查询服务监控详细信息
export function getInfo() {
  return request({
    url: '/monitor/server/getInfo',
    method: 'get'
  })
}
