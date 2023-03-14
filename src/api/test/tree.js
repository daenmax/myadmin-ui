import request from '@/utils/request'

// 查询测试树表列表
export function listTree(query) {
  return request({
    url: '/test/tree/list',
    method: 'get',
    params: query
  })
}

// 查询测试树表详细
export function getTree(id) {
  return request({
    url: '/test/tree/' + id,
    method: 'get'
  })
}

// 新增测试树表
export function addTree(data) {
  return request({
    url: '/test/tree',
    method: 'post',
    data: data
  })
}

// 修改测试树表
export function updateTree(data) {
  return request({
    url: '/test/tree',
    method: 'put',
    data: data
  })
}

// 删除测试树表
export function delTree(id) {
  return request({
    url: '/test/tree/' + id,
    method: 'delete'
  })
}
