// 安全管理

import request from '@/utils/request'
import { SystemUrl, AqglAddressUrl } from './url'

// 根据ID删除对象
export function delObject(entityId, business) {
  return request({
    url: `${AqglAddressUrl}/${business}/delete/${entityId}`,
    method: 'delete'
  })
}
// 根据ID获取对象
export function getObjectById(entityId, business) {
  return request({
    url: `${AqglAddressUrl}/${business}/get/${entityId}`,
    method: 'get'
  })
}

// 保存对象
export function saveObject(data, business) {
  return request({
    url: `${AqglAddressUrl}/${business}/save`,
    method: 'post',
    data
  })
}

// 更新对象
export function updateObject(data, business) {
  return request({
    url: `${AqglAddressUrl}/${business}/update`,
    method: 'post',
    data
  })
}

// 批量删除
export function deleteBatches(data, bussiness) {
  return request({
    url: `${AqglAddressUrl}/${bussiness}/delete`,
    method: 'delete',
    data
  })
}
// 获取字典数据
export function getDictData(parentId) {
  return request({
    url: `${SystemUrl}/sysDict/findParentId?parentId=${parentId}`,
    method: 'post'
  })
}

// 获取安全地点列表
export function getAqglAddressList(bussiness) {
  return request({
    url: `${AqglAddressUrl}/${bussiness}/getAqglAddressList`,
    method: 'post'
  })
}
