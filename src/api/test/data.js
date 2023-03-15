import request from '@/utils/request'

// 分页接口1
export function listDemo1(query) {
  return request({
    url: '/test/data/list1',
    method: 'get',
    params: query
  })
}

// 分页接口2
export function listDemo2(query) {
  return request({
    url: '/test/data/list2',
    method: 'get',
    params: query
  })
}

// 分页接口3
export function listDemo3(query) {
  return request({
    url: '/test/data/list3',
    method: 'get',
    params: query
  })
}

// 查询测试数据详细
export function getDemo(id) {
  return request({
    url: '/test/data/' + id,
    method: 'get'
  })
}

// 新增测试数据
export function addDemo(data) {
  return request({
    url: '/test/data',
    method: 'post',
    data: data
  })
}

// 修改测试数据
export function updateDemo(data) {
  return request({
    url: '/test/data',
    method: 'put',
    data: data
  })
}

// 删除测试数据
export function delDemo(id) {
  return request({
    url: '/test/data/' + id,
    method: 'delete'
  })
}

