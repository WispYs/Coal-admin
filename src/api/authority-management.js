import request from '@/utils/request'
import { SystemUrl } from './url'

// 应用管理系统
export function getApplicationList(data) {
  return request({
    url: `${SystemUrl}/sysManage/search`,
    method: 'post',
    data
  })
}
export function createApplication(data) {
  return request({
    url: `${SystemUrl}/sysManage/save`,
    method: 'post',
    data
  })
}
export function getApplicationInfo(id) {
  return request({
    url: `${SystemUrl}/sysManage/get/${id}`,
    method: 'get'
  })
}
export function editApplication(data) {
  return request({
    url: `${SystemUrl}/sysManage/update`,
    method: 'post',
    data
  })
}
export function delApplication(id) {
  return request({
    url: `${SystemUrl}/sysManage/delete/${id}`,
    method: 'delete'
  })
}

// 用户管理
export function getUserList(data) {
  return request({
    url: `${SystemUrl}/sysUser/search`,
    method: 'post',
    data
  })
}
export function createUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/save`,
    method: 'post',
    data
  })
}
export function getUserInfo(id) {
  return request({
    url: `${SystemUrl}/sysUser/get/${id}`,
    method: 'get'
  })
}
export function editUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/update`,
    method: 'post',
    data
  })
}
export function delUser(id) {
  return request({
    url: `${SystemUrl}/sysUser/delete/${id}`,
    method: 'delete'
  })
}
export function resetUserPassword(sysUserId) {
  return request({
    url: `${SystemUrl}/sysUser/resetPwd`,
    method: 'delete',
    params: { sysUserId }
  })
}

// 组织机构管理
export function getOrganList(params) {
  return request({
    url: '/system/organization/list',
    method: 'get',
    params
  })
}
export function createOrganLsit(params) {
  return request({
    url: '/admin/createOrganLsit/list',
    method: 'get',
    params
  })
}

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: SystemUrl + '/sysRole/search',
    method: 'post',
    data
  })
}

//获取角色类型列表
export function getRoleTypeList(data) {
  return request({
    url: SystemUrl + '/sysRoleType/search',
    method: 'post',
    data
  })
}

// 创建角色类型
export function saveRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/save',
    method: 'post',
    data
  })
}

// 删除角色类型
export function deleteRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/delete/'+data,
    method: 'delete',
    data
  })
}

// 修改角色类型
export function updateRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/update',
    method: 'post',
    data
  })
}

// 获取站点列表
export function getSiteList(data) {
  return request({
    url: SystemUrl + '/sysManage/search',
    method: 'post',
    data
  })
}

// 创建角色
export function saveRole(data) {
  return request({
    url: SystemUrl + '/sysRole/save',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: SystemUrl + '/sysRole/delete/'+data,
    method: 'delete',
    data
  })
}

// 更新对象信息
export function updateRole(data) {
  return request({
    url: SystemUrl + '/sysRole/update',
    method: 'post',
    data
  })
}
