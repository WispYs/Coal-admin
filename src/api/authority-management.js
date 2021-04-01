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
    url: `${SystemUrl}/sysManage/get`,
    method: 'post',
    data: { id }
  })
}
export function editApplication(data) {
  return request({
    url: `${SystemUrl}/sysManage/update`,
    method: 'post',
    data
  })
}

// 用户管理
export function getUserList(data) {
  return request({
    url: `${SystemUrl}/sysUser/search`,
    method: 'get',
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
