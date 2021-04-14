import request from '@/utils/request'
import { MechaUrl } from './url'

/** ---- 机电管理 ---- **/
//  大型设备管理  //
//  列表
export function getLargeEquipmentList(data) {
  return request({
    url: `${MechaUrl}/device/detail/list`,
    method: 'post',
    data
  })
}
//  详情
export function getLargeEquipmentInfo(id) {
  return request({
    url: `${MechaUrl}/device/detail/${id}`,
    method: 'get'
  })
}
//  新建
export function createLargeEquipment(data) {
  return request({
    url: `${MechaUrl}/device/detail/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editLargeEquipment(data) {
  return request({
    url: `${MechaUrl}/device/detail/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delLargeEquipment(id) {
  return request({
    url: `${MechaUrl}/device/detail/delete/${id}`,
    method: 'delete'
  })
}
//  大型设备特有属性  //
//  列表
export function getEquipmentAreaList(data) {
  return request({
    url: `${MechaUrl}/device/attr/list`,
    method: 'post',
    data
  })
}
//  详情
export function getEquipmentAreaInfo(id) {
  return request({
    url: `${MechaUrl}/device/attr/${id}`,
    method: 'get'
  })
}
//  新建
export function createEquipmentArea(data) {
  return request({
    url: `${MechaUrl}/device/attr/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editEquipmentArea(data) {
  return request({
    url: `${MechaUrl}/device/attr/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delEquipmentArea(id) {
  return request({
    url: `${MechaUrl}/device/attr/delete/${id}`,
    method: 'delete'
  })
}
//  大型设备类型  //
//  列表
export function getLargeEquipmentType(data) {
  return request({
    url: `${MechaUrl}/device/type/list`,
    method: 'post',
    data
  })
}
//  详情
export function getLargeEquipmentTypeInfo(id) {
  return request({
    url: `${MechaUrl}/device/type/${id}`,
    method: 'get'
  })
}
//  新建
export function createLargeEquipmentType(data) {
  return request({
    url: `${MechaUrl}/device/type/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editLargeEquipmentType(data) {
  return request({
    url: `${MechaUrl}/device/type/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delLargeEquipmentType(id) {
  return request({
    url: `${MechaUrl}/device/type/delete/${id}`,
    method: 'delete'
  })
}
//  维修知识库  //
//  列表
export function getKnowLedgeList(data) {
  return request({
    url: `${MechaUrl}/device/plan/repair/list`,
    method: 'post',
    data
  })
}
//  详情
export function getKnowLedgeInfo(id) {
  return request({
    url: `${MechaUrl}/device/plan/repair/${id}`,
    method: 'get'
  })
}
//  新建
export function createKnowLedge(data) {
  return request({
    url: `${MechaUrl}/device/plan/repair/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editKnowLedge(data) {
  return request({
    url: `${MechaUrl}/device/plan/repair/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delKnowLedge(id) {
  return request({
    url: `${MechaUrl}/device/plan/repair/delete/${id}`,
    method: 'delete'
  })
}
//  设备能耗分析知识库  //
export function getDisKnowLedgeList(params) {
  return request({
    url: '/dissipation-know-ledge/list',
    method: 'get',
    params
  })
}

/** ---- 设备管理 ---- **/

/** ---- 检修管理 ---- **/
//  检修计划  //
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

