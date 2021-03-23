import request from '@/utils/request'

export function getApplicationList(params) {
  return request({
    url: '/system/application/list',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: '/system/user/list',
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

export function getRoleList(params) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params
  })
}

