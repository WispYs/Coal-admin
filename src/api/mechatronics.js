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

/** ---- 供电管理 ---- **/

/** ---- 运输管理 ---- **/

/** ---- 机电图件 ---- **/

/** ---- 技术管理 ---- **/

