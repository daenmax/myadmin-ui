import request from '@/utils/request'

// 查询缓存详细信息
export function getInfo() {
  return request({
    url: '/monitor/cache/getInfo',
    method: 'get'
  })
}
