import request from '@/utils/request'

// 查询对象存储配置列表
export function listOssConfig(query) {
  return request({
    url: '/monitor/ossConfig/list',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置下拉列表
export function allListOssConfig(query) {
  return request({
    url: '/monitor/ossConfig/allList',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置详细
export function getOssConfig(id) {
  return request({
    url: '/monitor/ossConfig/' + id,
    method: 'get'
  })
}

// 新增对象存储配置
export function addOssConfig(data) {
  return request({
    url: '/monitor/ossConfig/add',
    method: 'post',
    data: data
  })
}

// 修改对象存储配置
export function updateOssConfig(data) {
  return request({
    url: '/monitor/ossConfig/edit',
    method: 'post',
    data: data
  })
}

// 删除对象存储配置
export function delOssConfig(ids) {
  return request({
    url: '/monitor/ossConfig/remove',
    method: 'post',
    data: ids
  })
}

// 对象存储状态修改
export function changeOssConfigStatus(id, status) {
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
export function changeOssConfigInUse(id, status) {
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