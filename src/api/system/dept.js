import request from '@/utils/request'

// 查询部门列表
export function list(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(id) {
  const data = {
    id
  }
  return request({
    url: '/system/dept/query',
    method: 'get',
    params: data
  })
}

// 新增部门
export function add(data) {
  return request({
    url: '/system/dept/add',
    method: 'post',
    data: data
  })
}

// 修改部门
export function edit(data) {
  return request({
    url: '/system/dept/edit',
    method: 'post',
    data: data
  })
}

// 删除部门
export function del(id) {
  const data = {
    id
  }
  return request({
    url: '/system/dept/del',
    method: 'post',
    params: data
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/system/dept/getUserList',
    method: 'get',
    params: params
  })
}
