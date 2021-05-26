// 应急救援
import request from '@/utils/request'
import { SystemUrl, EmergencyRescue, FileUrl } from './url'

// 获取下拉列表框
export function getSelectData(data, business) {
  return request({
    url: `${EmergencyRescue}/${business}/baseSelectCombox`,
    method: 'post',
    data
  })
}

// 根据ID删除对象
export function delObject(entityId, business) {
  return request({
    url: `${EmergencyRescue}/${business}/delete/${entityId}`,
    method: 'delete'
  })
}
// 根据ID获取对象
export function getObjectById(entityId, business) {
  return request({
    url: `${EmergencyRescue}/${business}/get/${entityId}`,
    method: 'get'
  })
}

// 保存对象
export function saveObject(data, business) {
  return request({
    url: `${EmergencyRescue}/${business}/save`,
    method: 'post',
    data
  })
}

// 分页查询对象
export function getObjectByPage(data, business) {
  return request({
    url: `${EmergencyRescue}/${business}/search`,
    method: 'post',
    data
  })
}

// 更新对象
export function updateObject(data, business) {
  return request({
    url: `${EmergencyRescue}/${business}/update`,
    method: 'post',
    data
  })
}

// 批量删除
export function deleteBatches(data, bussiness) {
  return request({
    url: `${EmergencyRescue}/${bussiness}/delete`,
    method: 'delete',
    data
  })
}

// 获取应急通讯组织结构名称树
export function getEmergencyCommunicationOrganizationTree(data = {}) {
  return request({
    url: `${EmergencyRescue}/yjjyCommunicationTissue/getYjjyCommunicationTissuePageTree`,
    method: 'post',
    data
  })
}

// 获取全部应急通讯组织结构名称树
export function getYjjyCommunicationTissueAllTree(data = {}) {
  return request({
    url: `${EmergencyRescue}/yjjyCommunicationTissue/getYjjyCommunicationTissueTree`,
    method: 'post',
    data
  })
}

// 获取应急通讯组织结构名称树
export function getYjjySpecialPlansTree(menuId) {
  return request({
    url: `${EmergencyRescue}/yjjySpecialPlans/getYjjySpecialPlansTree/${menuId}`,
    method: 'post'
  })
}

// 获取专项预案事故文件
export function download(data = {}) {
  return request({
    url: `${FileUrl}/convert`,
    method: 'post',
    responseType: 'blob',
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

// 获取事故总览
export function getAccountOverview(parentId) {
  return request({
    url: `${EmergencyRescue}/yjjyAccidentManage/overview`,
    method: 'get'
  })
}

// 获取附件管理文件
export function getFileNameByEventId(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/listByEventIds`,
    method: 'post',
    data
  })
}
