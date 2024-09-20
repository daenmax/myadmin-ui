import request from '@/utils/request'

// 查询列表
export function pageNotice(query) {
  return request({
    url: '/monitor/notice/page',
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
    url: '/monitor/notice/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updateNotice(data) {
  return request({
    url: '/monitor/notice/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function delNotice(ids) {
  return request({
    url: '/monitor/notice/remove',
    method: 'post',
    data: ids
  })
}