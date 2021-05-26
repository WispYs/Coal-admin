// 一张图设置
import request from '@/utils/request'
import { OnePictureSetting } from './url'

// 根据ID删除对象
export function delObject(entityId, business) {
  return request({
    url: `${OnePictureSetting}/${business}/delete/${entityId}`,
    method: 'delete'
  })
}
// 根据ID获取对象
export function getObjectById(entityId, business) {
  return request({
    url: `${OnePictureSetting}/${business}/get/${entityId}`,
    method: 'get'
  })
}

// 保存对象
export function saveObject(data, business) {
  return request({
    url: `${OnePictureSetting}/${business}/save`,
    method: 'post',
    data
  })
}

// 更新对象
export function updateObject(data, business) {
  return request({
    url: `${OnePictureSetting}/${business}/update`,
    method: 'post',
    data
  })
}

// 批量删除
export function deleteBatches(data, bussiness) {
  return request({
    url: `${OnePictureSetting}/${bussiness}/delete`,
    method: 'delete',
    data
  })
}

// 获取实体分类信息分页树
export function getSysEntityTypePageTree(data = {}, bussiness) {
  return request({
    url: `${OnePictureSetting}/${bussiness}/getSysEntityTypePageTree`,
    method: 'post',
    data
  })
}

// 获取全部实体类型树
export function getSysEntityTypeTree(bussiness) {
  return request({
    url: `${OnePictureSetting}/sysEntityType/getSysEntityTypeTree`,
    method: 'post'
  })
}

// 获取属性树
export function getAttributeSetSearch(keyword, bussiness) {
  return request({
    url: `${OnePictureSetting}/${bussiness}/getAttributeSetSearch?keyWord=${keyword}`,
    method: 'post'
  })
}

// 获取对应实体分类下的实体列表
export function getSysEntityList(sysEntityTypeId) {
  return request({
    url: `${OnePictureSetting}/sysEntity/getSysEntityList?sysEntityTypeId=${sysEntityTypeId}`,
    method: 'post'
  })
}

