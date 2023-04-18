import request from '@/utils/request'

// 查询对象存储配置列表
export function listOssConfig(query) {
  return request({
    url: '/system/ossConfig/list',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置下拉列表
export function allListOssConfig(query) {
  return request({
    url: '/system/ossConfig/allList',
    method: 'get',
    params: query
  })
}

// 查询对象存储配置详细
export function getOssConfig(id) {
  return request({
    url: '/system/ossConfig/' + id,
    method: 'get'
  })
}

// 新增对象存储配置
export function addOssConfig(data) {
  return request({
    url: '/system/ossConfig',
    method: 'post',
    data: data
  })
}

// 修改对象存储配置
export function updateOssConfig(data) {
  return request({
    url: '/system/ossConfig',
    method: 'put',
    data: data
  })
}

// 删除对象存储配置
export function delOssConfig(ids) {
  return request({
    url: '/system/ossConfig',
    method: 'delete',
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
    url: '/system/ossConfig/changeStatus',
    method: 'put',
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
    url: '/system/ossConfig/changeInUse',
    method: 'put',
    data: data
  })
}