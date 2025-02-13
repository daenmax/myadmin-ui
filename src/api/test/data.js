import request from '@/utils/request'

// 导出
export const exportData =  '/test/data/exportData'

// 导入
export const importData =  '/test/data/importData'

// 下载导入模板
export const importTemplate =  '/test/data/importTemplate'

// 分页列表
export function page(query) {
  return request({
    url: '/test/data/page',
    method: 'get',
    params: query
  })
}

// 分页列表2
export function page2(query) {
  return request({
    url: '/test/data/page2',
    method: 'get',
    params: query
  })
}

// 分页列表3
export function page3(query) {
  return request({
    url: '/test/data/page3',
    method: 'get',
    params: query
  })
}

// 查询
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/test/data/query',
    method: 'get',
    params: data
  })
}

// 新增
export function add(data) {
  return request({
    url: '/test/data/add',
    method: 'post',
    data: data
  })
}

// 修改
export function edit(data) {
  return request({
    url: '/test/data/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function del(ids) {
  return request({
    url: '/test/data/del',
    method: 'post',
    data: ids
  })
}

// 修改状态
export function changeStatus(id, status) {
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
