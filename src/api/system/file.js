import request from '@/utils/request'

// 查询文件列表
export function listFile(query) {
  return request({
    url: '/system/file/list',
    method: 'get',
    params: query
  })
}

// 查询文件列表_根据指定ID列表
export function listByIds(fileIds) {
  return request({
    url: '/system/file/listByIds/' + fileIds,
    method: 'get'
  })
}

// 删除对象存储
export function delFile(ids) {
  let data;
  console.log(typeof ids)
  if(typeof ids == 'string'){
    data = [ids]
  }else{
    data =ids
  }
  console.log(data)
  return request({
    url: '/system/file',
    method: 'delete',
    data: data
  })
}

