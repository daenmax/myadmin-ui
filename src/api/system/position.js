import request from '@/utils/request'

// 导出
export const exportData =  '/system/position/exportData'

// 查询岗位列表
export function page(query) {
  return request({
    url: '/system/position/page',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/system/position/query',
    method: 'get',
    params: data
  })
}

// 新增岗位
export function add(data) {
  return request({
    url: '/system/position/add',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function edit(data) {
  return request({
    url: '/system/position/edit',
    method: 'post',
    data: data
  })
}

// 删除岗位
export function del(ids) {
  return request({
    url: '/system/position/del',
    method: 'post',
    data: ids
  })
}

// 查询岗位已授权用户列表
export function allocatedAuthUserPage(query) {
  return request({
    url: '/system/position/allocatedAuthUserPage',
    method: 'get',
    params: query
  })
}

// 查询岗位未授权用户列表
export function unallocatedAuthUserPage(query) {
  return request({
    url: '/system/position/unallocatedAuthUserPage',
    method: 'get',
    params: query
  })
}

// 取消用户授权岗位
export function cancelAuthUser(data) {
  return request({
    url: '/system/position/cancelAuthUser',
    method: 'post',
    data: data
  })
}


// 保存授权用户选择
export function saveAuthUser(data) {
  return request({
    url: '/system/position/saveAuthUser',
    method: 'post',
    data: data
  })
}
