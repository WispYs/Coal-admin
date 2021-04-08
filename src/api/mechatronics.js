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

/** ---- 设备管理 ---- **/

/** ---- 检修管理 ---- **/

/** ---- 供电管理 ---- **/

/** ---- 运输管理 ---- **/

/** ---- 机电图件 ---- **/

/** ---- 技术管理 ---- **/

