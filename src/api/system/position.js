import request from '@/utils/request'

// 查询岗位列表
export function listPosition(query) {
  return request({
    url: '/system/position/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPosition(id) {
  return request({
    url: '/system/position/' + id,
    method: 'get'
  })
}

// 新增岗位
export function addPosition(data) {
  return request({
    url: '/system/position/add',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePosition(data) {
  return request({
    url: '/system/position/edit',
    method: 'post',
    data: data
  })
}

// 删除岗位
export function delPosition(ids) {
  return request({
    url: '/system/position/remove',
    method: 'post',
    data: ids
  })
}

// 查询岗位已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/position/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询岗位未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/position/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权岗位
export function authUserCancel(data) {
  return request({
    url: '/system/position/authUser/cancel',
    method: 'post',
    data: data
  })
}


// 保存授权用户选择
export function authUserSave(data) {
  return request({
    url: '/system/position/authUser/save',
    method: 'post',
    data: data
  })
}