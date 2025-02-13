import request from '@/utils/request'

// 查询列表
export function page(query) {
  return request({
    url: '/monitor/notice/page',
    method: 'get',
    params: query
  })
}

// 查询详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/monitor/notice/query',
    method: 'get',
    params: data
  })
}

// 新增
export function add(data) {
  return request({
    url: '/monitor/notice/add',
    method: 'post',
    data: data
  })
}

// 修改
export function edit(data) {
  return request({
    url: '/monitor/notice/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function del(ids) {
  return request({
    url: '/monitor/notice/del',
    method: 'post',
    data: ids
  })
}
