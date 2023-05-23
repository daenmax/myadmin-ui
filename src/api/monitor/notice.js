import request from '@/utils/request'

// 查询列表
export function listNotice(query) {
  return request({
    url: '/monitor/notice/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getNotice(noticeId) {
  return request({
    url: '/monitor/notice/' + noticeId,
    method: 'get'
  })
}

// 新增
export function addNotice(data) {
  return request({
    url: '/monitor/notice',
    method: 'post',
    data: data
  })
}

// 修改
export function updateNotice(data) {
  return request({
    url: '/monitor/notice',
    method: 'put',
    data: data
  })
}

// 删除
export function delNotice(ids) {
  return request({
    url: '/monitor/notice',
    method: 'delete',
    data: ids
  })
}