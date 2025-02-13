import request from '@/utils/request'

// 导出
export const exportData =  '/system/role/exportData'

// 查询角色列表
export function page(query) {
  return request({
    url: '/system/role/page',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/system/role/query',
    method: 'get',
    params: data
  })
}

// 新增角色
export function add(data) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data: data
  })
}

// 修改角色
export function edit(data) {
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
export function del(ids) {
  return request({
    url: '/system/role/del',
    method: 'post',
    data: ids
  })
}

// 查询角色已授权用户列表
export function allocatedAuthUserPage(query) {
  return request({
    url: '/system/role/allocatedAuthUserPage',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedAuthUserPage(query) {
  return request({
    url: '/system/role/unallocatedAuthUserPage',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function cancelAuthUser(data) {
  return request({
    url: '/system/role/cancelAuthUser',
    method: 'post',
    data: data
  })
}


// 保存授权用户选择
export function saveAuthUser(data) {
  return request({
    url: '/system/role/saveAuthUser',
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
