import request from '@/utils/request'
import {parseStrEmpty} from "@/utils/ruoyi";

// 导出
export const exportData =  '/system/user/exportData'

//导入
export const importData =  '/system/user/importData'

// 下载导入模板
export const importTemplate =  '/system/user/importTemplate'

// 查询用户列表
export function page(query) {
  return request({
    url: '/system/user/page',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/system/user/query',
    method: 'get',
    params: data
  })
}

// 新增用户
export function add(data) {
  return request({
    url: '/system/user/add',
    method: 'post',
    data: data
  })
}

// 修改用户
export function edit(data) {
  return request({
    url: '/system/user/edit',
    method: 'post',
    data: data
  })
}

// 删除用户
export function del(ids) {
  return request({
    url: '/system/user/del',
    method: 'post',
    data: ids
  })
}

// 用户密码重置
export function resetPwd(id, password) {
  const data = {
    id,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'post',
    data: data
  })
}

// 用户状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(id) {
  return request({
    url: '/system/user/authRole/' + id,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'post',
    data: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/system/user/deptTree',
    method: 'get'
  })
}

