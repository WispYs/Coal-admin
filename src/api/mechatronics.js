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
    url: `${MechaUrl}/device/detail/${id}`,
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
    url: `${MechaUrl}/device/attr/${id}`,
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
    url: `${MechaUrl}/device/type/${id}`,
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
    url: `${MechaUrl}/device/plan/repair/${id}`,
    method: 'delete'
  })
}
//  设备能耗分析知识库  //
//  列表
export function getDisKnowLedgeList(data) {
  return request({
    url: `${MechaUrl}/device/analyze/list`,
    method: 'post',
    data
  })
}
//  详情
export function getDisKnowLedgeInfo(id) {
  return request({
    url: `${MechaUrl}/device/analyze/${id}`,
    method: 'get'
  })
}
//  新建
export function createDisKnowLedge(data) {
  return request({
    url: `${MechaUrl}/device/analyze/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editDisKnowLedge(data) {
  return request({
    url: `${MechaUrl}/device/analyze/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delDisKnowLedge(id) {
  return request({
    url: `${MechaUrl}/device/analyze/${id}`,
    method: 'delete'
  })
}

/** ---- 设备管理 ---- **/
//  供应商管理  //
//  列表
export function getSupplierList(data) {
  return request({
    // url: `${MechaUrl}/device/plan/repair/list`,
    url: `/supplier/list`,
    method: 'post',
    data
  })
}
//  详情
export function getSupplierInfo(id) {
  return request({
    url: `${MechaUrl}/device/plan/repair/${id}`,
    method: 'get'
  })
}
//  新建
export function createSupplier(data) {
  return request({
    url: `${MechaUrl}/device/plan/repair/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editSupplier(data) {
  return request({
    url: `${MechaUrl}/device/plan/repair/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delSupplier(id) {
  return request({
    url: `${MechaUrl}/device/plan/repair/${id}`,
    method: 'delete'
  })
}

/** ---- 检修管理 ---- **/
//  检修计划  //
//  列表
export function getServicePlanList(data) {
  return request({
    url: `${MechaUrl}/overhaul/plan/list`,
    method: 'post',
    data
  })
}
//  详情
export function getServicePlanInfo(id) {
  return request({
    url: `${MechaUrl}/overhaul/plan/${id}`,
    method: 'get'
  })
}
//  新建
export function createServicePlan(data) {
  return request({
    url: `${MechaUrl}/overhaul/plan/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editServicePlan(data) {
  return request({
    url: `${MechaUrl}/overhaul/plan/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delServicePlan(id) {
  return request({
    url: `${MechaUrl}/overhaul/plan/${id}`,
    method: 'delete'
  })
}
// 日常维检管理
//  列表
export function getDailyServiceList(data) {
  return request({
    url: `${MechaUrl}/overhaul/plan/list`,
    method: 'post',
    data
  })
}
//  详情
export function getDailyServiceInfo(id) {
  return request({
    url: `${MechaUrl}/overhaul/daily/${id}`,
    method: 'get'
  })
}
//  新建
export function createDailyService(data) {
  return request({
    url: `${MechaUrl}/overhaul/daily/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editDailyService(data) {
  return request({
    url: `${MechaUrl}/overhaul/daily/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delDailyService(id) {
  return request({
    url: `${MechaUrl}/overhaul/daily/${id}`,
    method: 'delete'
  })
}
// 设备维修
//  列表
export function getEquipmentServiceList(data) {
  return request({
    url: `${MechaUrl}/overhaul/device/list`,
    method: 'post',
    data
  })
}
//  详情
export function getEquipmentServiceInfo(id) {
  return request({
    url: `${MechaUrl}/overhaul/device/${id}`,
    method: 'get'
  })
}
//  新建
export function createEquipmentService(data) {
  return request({
    url: `${MechaUrl}/overhaul/device/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editEquipmentService(data) {
  return request({
    url: `${MechaUrl}/overhaul/device/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delEquipmentService(id) {
  return request({
    url: `${MechaUrl}/overhaul/device/${id}`,
    method: 'delete'
  })
}
// 备品备件
//  列表
export function getSparePartList(data) {
  return request({
    url: `${MechaUrl}/spare/parts/list`,
    method: 'post',
    data
  })
}
//  详情
export function getSparePartInfo(id) {
  return request({
    url: `${MechaUrl}/spare/parts/${id}`,
    method: 'get'
  })
}
//  新建
export function createSparePart(data) {
  return request({
    url: `${MechaUrl}/spare/parts/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editSparePart(data) {
  return request({
    url: `${MechaUrl}/spare/parts/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delSparePart(id) {
  return request({
    url: `${MechaUrl}/spare/parts/${id}`,
    method: 'delete'
  })
}
//  领用
export function createSpareReceive(data) {
  return request({
    url: `${MechaUrl}/spare/pick/detail/save`,
    method: 'post',
    data
  })
}
//  入库
export function createSpareStore(data) {
  return request({
    url: `${MechaUrl}/spare/storage/detail/save`,
    method: 'post',
    data
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

