import request from '@/utils/request'
import { SystemUrl } from './url'

export function getApplicationList(params) {
  return request({
    url: '/system/application/list',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: `${SystemUrl}/sysUser/getInfo`,
    method: 'get',
    params
  })
}

export function getOrganList(params) {
  return request({
    url: '/system/organization/list',
    method: 'get',
    params
  })
}
export function createOrganLsit(params){
  return request({
    url: '/admin/createOrganLsit/list',
    method: 'get',
    params
  })
}

export function getRoleList(params) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params
  })
}
