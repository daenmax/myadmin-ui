import request from '@/utils/request'

// 查询接口限制列表
export function listApiLimit(query) {
  return request({
    url: '/monitor/apiLimit/list',
    method: 'get',
    params: query
  })
}

// 查询接口限制详细
export function getApiLimit(id) {
  return request({
    url: '/monitor/apiLimit/' + id,
    method: 'get'
  })
}

// 新增接口限制
export function addApiLimit(data) {
  return request({
    url: '/monitor/apiLimit/add',
    method: 'post',
    data: data
  })
}

// 修改接口限制
export function updateApiLimit(data) {
  return request({
    url: '/monitor/apiLimit/edit',
    method: 'post',
    data: data
  })
}

// 删除接口限制
export function delApiLimit(ids) {
  return request({
    url: '/monitor/apiLimit/remove',
    method: 'post',
    data: ids
  })
}

// 接口限制状态修改
export function changeApiLimitStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/monitor/apiLimit/changeStatus',
    method: 'post',
    data: data
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/monitor/apiLimit/refreshCache',
    method: 'post'
  })
}