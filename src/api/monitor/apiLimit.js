/**
 * 接口限制
 */
import request from '@/utils/request'

// 查询接口限制列表
export function page(query) {
  return request({
    url: '/monitor/apiLimit/page',
    method: 'get',
    params: query
  })
}

// 查询接口限制详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/monitor/apiLimit/query',
    method: 'get',
    params: data
  })
}

// 新增接口限制
export function add(data) {
  return request({
    url: '/monitor/apiLimit/add',
    method: 'post',
    data: data
  })
}

// 修改接口限制
export function edit(data) {
  return request({
    url: '/monitor/apiLimit/edit',
    method: 'post',
    data: data
  })
}

// 删除接口限制
export function del(ids) {
  return request({
    url: '/monitor/apiLimit/del',
    method: 'post',
    data: ids
  })
}

// 接口限制状态修改
export function changeStatus(id, status) {
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
