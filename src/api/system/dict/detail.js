import request from '@/utils/request'

// 查询字典数据列表
export function pageData(query) {
  return request({
    url: '/system/dict/detail/page',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dict/detail/' + dictCode,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/system/dict/detail/add',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/system/dict/detail/edit',
    method: 'post',
    data: data
  })
}

// 删除字典数据
export function delData(dictCodes) {
  return request({
    url: '/system/dict/detail/remove',
    method: 'post',
    data: dictCodes
  })
}
