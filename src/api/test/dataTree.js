import request from '@/utils/request'

// 查询测试树表列表
export function listDataTree(query) {
  return request({
    url: '/test/dataTree/list',
    method: 'get',
    params: query
  })
}

// 查询测试树表详细
export function getDataTree(id) {
  return request({
    url: '/test/dataTree/' + id,
    method: 'get'
  })
}

// 新增测试树表
export function addDataTree(data) {
  return request({
    url: '/test/dataTree/add',
    method: 'post',
    data: data
  })
}

// 修改测试树表
export function updateDataTree(data) {
  return request({
    url: '/test/dataTree/edit',
    method: 'post',
    data: data
  })
}

// 删除测试树表
export function delDataTree(id) {
  return request({
    url: '/test/dataTree/remove/' + id,
    method: 'post'
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
    method: 'post',
    data: data
  })
}