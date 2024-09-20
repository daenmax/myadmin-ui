import request from '@/utils/request'

// 查询菜单列表
export function pageMenu(query) {
  return request({
    url: '/system/menu/page',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeSelect() {
  return request({
    url: '/system/menu/treeSelect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeSelect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeSelect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/system/menu/add',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/system/menu/edit',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/system/menu/remove/' + menuId,
    method: 'post'
  })
}