import request from '@/utils/request'

// 查询测试树表列表
export function listTree(query) {
  return request({
    url: '/test/dataTree/list',
    method: 'get',
    params: query
  })
}

// 查询测试树表详细
export function getTree(id) {
  return request({
    url: '/test/dataTree/' + id,
    method: 'get'
  })
}

// 新增测试树表
export function addTree(data) {
  return request({
    url: '/test/dataTree',
    method: 'post',
    data: data
  })
}

// 修改测试树表
export function updateTree(data) {
  return request({
    url: '/test/dataTree',
    method: 'put',
    data: data
  })
}

// 删除测试树表
export function delTree(id) {
  return request({
    url: '/test/dataTree/' + id,
    method: 'delete'
  })
}

// 数据状态修改
export function changeDataTreeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/test/dataTree/changeStatus',
    method: 'put',
    data: data
  })
}