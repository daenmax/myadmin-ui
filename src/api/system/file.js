import request from '@/utils/request'

// 查询OSS对象存储列表
export function listFile(query) {
  return request({
    url: '/system/file/list',
    method: 'get',
    params: query
  })
}

// 查询文件列表
export function listByIds(fileId) {
  return request({
    url: '/system/file/listByIds/' + fileId,
    method: 'get'
  })
}

// 删除对象存储
export function delFile(ids) {
  return request({
    url: '/system/file',
    method: 'delete',
    data: ids
  })
}

