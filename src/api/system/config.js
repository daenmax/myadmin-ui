import request from '@/utils/request'

// 导出
export const exportData =  '/system/config/exportData'

// 查询参数列表
export function page(query) {
  return request({
    url: '/system/config/page',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/system/config/query',
    method: 'get',
    params: data
  })
}

// 新增参数配置
export function add(data) {
  return request({
    url: '/system/config/add',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function edit(data) {
  return request({
    url: '/system/config/edit',
    method: 'post',
    data: data
  })
}

// 删除参数配置
export function del(ids) {
  return request({
    url: '/system/config/del',
    method: 'post',
    data: ids
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'post'
  })
}

