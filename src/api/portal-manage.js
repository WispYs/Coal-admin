import request from '@/utils/request'
import { SystemUrl } from './url.js'

/** ---- 门户设置管理 ---- **/
//  门户资源设置  //
//  列表
export function getPortalResourceList(data) {
  return request({
    url: `${SystemUrl}/cfgResource/search`,
    method: 'post',
    data
  })
}
//  新建
export function createPortalResource(data) {
  return request({
    url: `${SystemUrl}/cfgResource/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editPortalResource(data) {
  return request({
    url: `${SystemUrl}/cfgResource/update`,
    method: 'post',
    data
  })
}
//  详情
export function getPortalResourceInfo(id) {
  return request({
    url: `${SystemUrl}/cfgResource/get/${id}`,
    method: 'get'
  })
}
//  删除
export function delPortalResource(id) {
  return request({
    url: `${SystemUrl}/cfgResource/delete/${id}`,
    method: 'delete'
  })
}
//  批量删除
export function batchDeletePortalResource(data) {
  return request({
    url: `${SystemUrl}/cfgResource/delete`,
    method: 'delete',
    data
  })
}
//  门户权限设置  //
//  获取用户资源配置列表
export function getAuthPortalResource(id) {
  return request({
    url: `${SystemUrl}/cfgResource/findSelectCombox?userId=${id}`,
    method: 'get'
  })
}
//  编辑
export function editAuthPortalResource(data) {
  return request({
    url: `${SystemUrl}/cfgPermission/saveOverall?cfgResourceIds=${data.cfgResourceIds}&userIds=${data.userIds}`,
    method: 'post'

  })
}
//  门户布置设置  //
//  获取当前用户门户布置设置
export function getAuthPortalLayout() {
  return request({
    url: `${SystemUrl}/cfgResource/findUserIdResources`,
    method: 'get'
  })
}
export function editAuthPortalLayout(data) {
  return request({
    url: `${SystemUrl}/cfgOverall/saveBatch`,
    method: 'post',
    data

  })
}
