import request from '@/utils/request'

// 查询对象存储配置列表
export function page(query) {
  return request({
    url: '/monitor/ossConfig/page',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置下拉列表
export function allList(query) {
  return request({
    url: '/monitor/ossConfig/allList',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/monitor/ossConfig/query',
    method: 'get',
    params: data
  })
}

// 新增对象存储配置
export function add(data) {
  return request({
    url: '/monitor/ossConfig/add',
    method: 'post',
    data: data
  })
}

// 修改对象存储配置
export function edit(data) {
  return request({
    url: '/monitor/ossConfig/edit',
    method: 'post',
    data: data
  })
}

// 删除对象存储配置
export function del(ids) {
  return request({
    url: '/monitor/ossConfig/del',
    method: 'post',
    data: ids
  })
}

// 对象存储状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/monitor/ossConfig/changeStatus',
    method: 'post',
    data: data
  })
}

// 对象存储使用状态修改
export function changeInUse(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/monitor/ossConfig/changeInUse',
    method: 'post',
    data: data
  })
}
