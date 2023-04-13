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
    url: '/system/position',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePosition(data) {
  return request({
    url: '/system/position',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPosition(ids) {
  return request({
    url: '/system/position',
    method: 'delete',
    data: ids
  })
}
