import request from '@/utils/request'

// 导出
export const exportData =  '/system/dict/exportData'

// 查询字典类型列表
export function page(query) {
  return request({
    url: '/system/dict/page',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/system/dict/query',
    method: 'get',
    params: data
  })
}

// 新增字典类型
export function add(data) {
  return request({
    url: '/system/dict/add',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function edit(data) {
  return request({
    url: '/system/dict/edit',
    method: 'post',
    data: data
  })
}

// 删除字典类型
export function del(dictIds) {
  return request({
    url: '/system/dict/del',
    method: 'post',
    data: dictIds
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/refreshCache',
    method: 'post'
  })
}

// 获取字典选择框列表
export function optionSelect() {
  return request({
    url: '/system/dict/optionSelect',
    method: 'get'
  })
}
