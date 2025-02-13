import request from '@/utils/request'

// 查询测试树表列表
export function list(query) {
  return request({
    url: '/test/dataTree/list',
    method: 'get',
    params: query
  })
}

// 查询测试树表详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/test/dataTree/query',
    method: 'get',
    params: data
  })
}

// 新增测试树表
export function add(data) {
  return request({
    url: '/test/dataTree/add',
    method: 'post',
    data: data
  })
}

// 修改测试树表
export function edit(data) {
  return request({
    url: '/test/dataTree/edit',
    method: 'post',
    data: data
  })
}

// 删除测试树表
export function del(id) {
  const data = {
    id
  }
  return request({
    url: '/test/dataTree/del',
    method: 'post',
    params: data
  })
}

// 数据状态修改
export function changeStatus(id, status) {
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
