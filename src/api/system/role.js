import request from '@/utils/request'

// 查询角色列表
export function pageRole(query) {
  return request({
    url: '/system/role/page',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/system/role/edit',
    method: 'post',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'post',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(ids) {
  return request({
    url: '/system/role/remove',
    method: 'post',
    data: ids
  })
}

// 查询角色已授权用户列表
export function allocatedUserPage(query) {
  return request({
    url: '/system/role/authUser/allocatedPage',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserPage(query) {
  return request({
    url: '/system/role/authUser/unallocatedPage',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'post',
    data: data
  })
}


// 保存授权用户选择
export function authUserSave(data) {
  return request({
    url: '/system/role/authUser/save',
    method: 'post',
    data: data
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeSelect(roleId) {
  return request({
    url: '/system/role/roleDeptTreeSelect/' + roleId,
    method: 'get'
  })
}
