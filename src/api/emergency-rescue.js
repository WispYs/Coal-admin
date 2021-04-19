// 应急救援
import request from '@/utils/request'
import { SystemUrl, EmergencyRescue } from './url'

// 获取下拉列表框
export function getSelectData(data, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/baseSelectCombox`,
    method: 'post',
    data
  })
}

// 根据ID删除对象
export function delObject(entityId, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/delete/${entityId}`,
    method: 'delete'
  })
}
// 根据ID获取对象
export function getObjectById(entityId, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/get/${entityId}`,
    method: 'get'
  })
}

// 保存对象
export function saveObject(data, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/save`,
    method: 'post',
    data
  })
}

// 分页查询对象
export function getObjectByPage(data, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/search`,
    method: 'post',
    data
  })
}

// 更新对象
export function updateObject(data, business) {
  return request({
    url: `${EmergencyRescue}/tomo-business/${business}/update`,
    method: 'post',
    data
  })
}

// 获取应急通讯组织结构名称树
export function getEmergencyCommunicationOrganizationTree(data = {}) {
  return request({
    url: `${EmergencyRescue}/tomo-business/yjjyCommunicationTissue/getYjjyCommunicationTissueTree`,
    method: 'post',
    data
  })
}

// 获取应急通讯组织结构名称树
export function getYjjySpecialPlansTree(data = {}) {
  return request({
    url: `${EmergencyRescue}/tomo-business/yjjySpecialPlans/getYjjySpecialPlansTree`,
    method: 'post',
    data
  })
}

// 获取专项预案事故文件
export function download(data = {}) {
  return request({
    url: `${EmergencyRescue}/file/convert`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function getDictData(parentId) {
  return request({
    url: `${SystemUrl}/sysDict/findParentId?parentId=${parentId}`,
    method: 'post'
  })
}
