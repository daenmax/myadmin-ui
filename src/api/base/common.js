import request from '@/utils/request'



// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/common/dict/' + dictType,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(key) {
  return request({
    url: '/common/config/' + key,
    method: 'get'
  })
}
