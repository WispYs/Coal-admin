import request from '@/utils/request'

/** ---- 机电管理 ---- **/

// 大型设备管理
export function getLargeEquipmentList(params) {
  return request({
    url: '/large-equipment-manage/list',
    method: 'get',
    params
  })
}
export function getEquipmentArea() {
  return request({
    url: '/equipment-area/list',
    method: 'get'
  })
}
// 大型设备类型
export function getLargeEquipmentType(params) {
  return request({
    url: '/large-equipment-type/list',
    method: 'get',
    params
  })
}
// 维修知识库
export function getKnowLedgeList(params) {
  return request({
    url: '/know-ledge/list',
    method: 'get',
    params
  })
}
// 设备能耗分析知识库
export function getDisKnowLedgeList(params) {
  return request({
    url: '/dissipation-know-ledge/list',
    method: 'get',
    params
  })
}

/** ---- 设备管理 ---- **/

/** ---- 检修管理 ---- **/
// 检修计划
export function getServicePlanList(params) {
  return request({
    url: '/service-plan/list',
    method: 'get',
    params
  })
}
// 日常维检管理
export function getDailyServiceList(params) {
  return request({
    url: '/service-plan/list',
    method: 'get',
    params
  })
}
// 设备维修
export function getEquipmentServiceList(params) {
  return request({
    url: '/equipment-service/list',
    method: 'get',
    params
  })
}
// 备品备件
export function getSparePartList(params) {
  return request({
    url: '/spare-part/list',
    method: 'get',
    params
  })
}
/** ---- 供电管理 ---- **/

/** ---- 运输管理 ---- **/
// 典型故障知识库
export function getTypicalFaultList(params) {
  return request({
    url: '/typical-fault/list',
    method: 'get',
    params
  })
}
// 历史故障知识库
export function getHistoryFaultList(params) {
  return request({
    url: '/history-fault/list',
    method: 'get',
    params
  })
}

/** ---- 机电图件 ---- **/

/** ---- 技术管理 ---- **/

