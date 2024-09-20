import request from '@/utils/request'

// 查询文件列表
export function pageFile(query) {
  return request({
    url: '/monitor/file/page',
    method: 'get',
    params: query
  })
}

// 查询文件列表_根据指定ID列表
export function listByIds(fileIds) {
  return request({
    url: '/monitor/file/listByIds/' + fileIds,
    method: 'get'
  })
}

// 删除对象存储
export function delFile(ids) {
  let data;
  if(typeof ids == 'string'){
    data = [ids]
  }else{
    data =ids
  }
  return request({
    url: '/monitor/file/remove',
    method: 'post',
    data: data
  })
}

