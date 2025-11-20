import request from '@/utils/request'

// 导出
export const exportData =  '/system/dict/detail/exportData'

// 查询字典数据列表
export function page(query) {
  return request({
    url: '/system/dict/detail/page',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function queryDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/system/dict/detail/query',
    method: 'get',
    params: data
  })
}

// 新增字典数据
export function add(data) {
  return request({
    url: '/system/dict/detail/add',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function edit(data) {
  return request({
    url: '/system/dict/detail/edit',
    method: 'post',
    data: data
  })
}

// 删除字典数据
export function del(dictCodes) {
  return request({
    url: '/system/dict/detail/del',
    method: 'post',
    data: dictCodes
  })
}
