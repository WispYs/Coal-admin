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
export function getUserList(params) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params
  })
}
// export function getUserList(data) {
//   return request({
//     url: `${SystemUrl}/sysUser/search`,
//     method: 'get',
//     data
//   })
// }
export function createUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/save`,
    method: 'post',
    data
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

// 角色管理
export function getRoleList(params) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params
  })
}
