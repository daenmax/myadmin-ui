import request from '@/utils/request'

// 分页接口1
export function pageData1(query) {
  return request({
    url: '/test/data/page1',
    method: 'get',
    params: query
  })
}

// 分页接口2
export function pageData2(query) {
  return request({
    url: '/test/data/page2',
    method: 'get',
    params: query
  })
}

// 分页接口3
export function pageData3(query) {
  return request({
    url: '/test/data/page3',
    method: 'get',
    params: query
  })
}

// 查询测试数据详细
export function getData(id) {
  return request({
    url: '/test/data/' + id,
    method: 'get'
  })
}

// 新增测试数据
export function addData(data) {
  return request({
    url: '/test/data/add',
    method: 'post',
    data: data
  })
}

// 修改测试数据
export function updateData(data) {
  return request({
    url: '/test/data/edit',
    method: 'post',
    data: data
  })
}

// 删除测试数据
export function delData(ids) {
  return request({
    url: '/test/data/remove',
    method: 'post',
    data: ids
  })
}

// 数据状态修改
export function changeDataStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/test/data/changeStatus',
    method: 'post',
    data: data
  })
}
