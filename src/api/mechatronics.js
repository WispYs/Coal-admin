import request from '@/utils/request'
import { MechaUrl, SystemUrl } from './url'
import qs from 'qs'

/** ---- 机电管理 ---- **/
//  大型设备管理  //
//  列表
export function getLargeEquipmentList(data) {
  return request({
    url: `${MechaUrl}/device/detail/list`,
    method: 'post',
    data: qs.stringify(data)
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
// 获取所属场所节点列表
export function getEquipPlaceList() {
  return request({
    url: `${MechaUrl}/device/type/getFirstNode`,
    method: 'get'
  })
}
// 获取大型设备类型树结构列表
export function getEquipTypeList() {
  return request({
    url: `${MechaUrl}/device/type/level`,
    method: 'get'
  })
}
// 查询所属场所子节点类型
export function getChildTypeList(data) {
  return request({
    url: `${MechaUrl}/device/type/listByChildren`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  大型设备特有属性  //
//  列表
export function getEquipmentAreaList(data) {
  return request({
    url: `${MechaUrl}/device/attr/list`,
    method: 'post',
    data: qs.stringify(data)
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
    data: qs.stringify(data)
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
    data: qs.stringify(data)
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
    data: qs.stringify(data)
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
    url: `${MechaUrl}/machine/supplier/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getSupplierInfo(id) {
  return request({
    url: `${MechaUrl}/machine/supplier/${id}`,
    method: 'get'
  })
}
//  新建
export function createSupplier(data) {
  return request({
    url: `${MechaUrl}/machine/supplier/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editSupplier(data) {
  return request({
    url: `${MechaUrl}/machine/supplier/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delSupplier(id) {
  return request({
    url: `${MechaUrl}/machine/supplier/${id}`,
    method: 'delete'
  })
}
//  设备类型管理
//  列表
export function getCategoryList(data) {
  return request({
    url: `${MechaUrl}/machine/type/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getCategoryInfo(id) {
  return request({
    url: `${MechaUrl}/machine/type/${id}`,
    method: 'get'
  })
}
//  新建
export function createCategory(data) {
  return request({
    url: `${MechaUrl}/machine/type/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editCategory(data) {
  return request({
    url: `${MechaUrl}/machine/type/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delCategory(id) {
  return request({
    url: `${MechaUrl}/machine/type/${id}`,
    method: 'delete'
  })
}
//  设备型号管理
//  列表
export function getModelList(data) {
  return request({
    url: `${MechaUrl}/machine/model/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getModelInfo(id) {
  return request({
    url: `${MechaUrl}/machine/model/${id}`,
    method: 'get'
  })
}
//  新建
export function createModel(data) {
  return request({
    url: `${MechaUrl}/machine/model/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editModel(data) {
  return request({
    url: `${MechaUrl}/machine/model/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delModel(id) {
  return request({
    url: `${MechaUrl}/machine/model/${id}`,
    method: 'delete'
  })
}
//  设备出入库
//  入库列表
export function getStorageList(data) {
  return request({
    url: `${MechaUrl}/machine/in/detail/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getStorageInfo(id) {
  return request({
    url: `${MechaUrl}/machine/in/detail/${id}`,
    method: 'get'
  })
}
//  新建
export function createStorage(data) {
  return request({
    url: `${MechaUrl}/machine/in/detail/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editStorage(data) {
  return request({
    url: `${MechaUrl}/machine/in/detail/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delStorage(id) {
  return request({
    url: `${MechaUrl}/machine/in/detail/${id}`,
    method: 'delete'
  })
}
//  出库
export function createOutStorage(data) {
  return request({
    url: `${MechaUrl}/machine/out/detail/save`,
    method: 'post',
    data
  })
}
//  在用设备
export function getUsingList(data) {
  return request({
    url: `${MechaUrl}/machine/using/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  回收
export function createRecycle(data) {
  return request({
    url: `${MechaUrl}/versal/recycle/save`,
    method: 'post',
    data
  })
}
//  移交
export function createTransfer(data) {
  return request({
    url: `${MechaUrl}/versal/transfer/save`,
    method: 'post',
    data
  })
}
//  查交
export function createCheck(data) {
  return request({
    url: `${MechaUrl}/versal/check/save`,
    method: 'post',
    data
  })
}
//  设备维修
//  维修/待修
export function createRepair(data) {
  return request({
    url: `${MechaUrl}/versal/repair/save`,
    method: 'post',
    data
  })
}
//  设备报废
//  报废
export function createScrap(data) {
  return request({
    url: `${MechaUrl}/versal/scrap/save`,
    method: 'post',
    data
  })
}
//  设备台账
//  生命周期
export function getLedgerLifeCycle(id) {
  return request({
    url: `${MechaUrl}/machine/ledger/lifeCycle/${id}`,
    method: 'get'
  })
}
//  领用列表
export function getVersalPickList(data) {
  return request({
    url: `${MechaUrl}/versal/pick/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  出库列表
export function getVersalOutList(data) {
  return request({
    url: `${MechaUrl}/machine/out/detail/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  回收列表
export function getVersalRecycleList(data) {
  return request({
    url: `${MechaUrl}/versal/recycle/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  待修列表
export function getWaitRepairList(data) {
  return request({
    url: `${MechaUrl}/versal/repair/list`,
    method: 'post',
    data: qs.stringify(Object.assign(data, { repairState: 1 }))
  })
}
//  维修列表
export function getRepairList(data) {
  return request({
    url: `${MechaUrl}/versal/repair/list`,
    method: 'post',
    data: qs.stringify(Object.assign(data, { repairState: 2 }))
  })
}
//  报废列表
export function getScrapList(data) {
  return request({
    url: `${MechaUrl}/versal/scrap/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  移交列表
export function getTransferList(data) {
  return request({
    url: `${MechaUrl}/versal/transfer/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查交列表
export function getCheckList(data) {
  return request({
    url: `${MechaUrl}/versal/check/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  设备证书
export function getCertificateList(data) {
  return request({
    url: `${MechaUrl}/machine/cert/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getCertificateInfo(id) {
  return request({
    url: `${MechaUrl}/machine/cert/${id}`,
    method: 'get'
  })
}
//  新建
export function createCertificate(data) {
  return request({
    url: `${MechaUrl}/machine/cert/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editCertificate(data) {
  return request({
    url: `${MechaUrl}/machine/cert/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delCertificate(id) {
  return request({
    url: `${MechaUrl}/machine/cert/${id}`,
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
    data: qs.stringify(data)
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
//  列表（维检记录）
export function getDailyServiceList(data) {
  return request({
    url: `${MechaUrl}/overhaul/daily/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情（维检记录）
export function getDailyServiceInfo(id) {
  return request({
    url: `${MechaUrl}/overhaul/plan/details/${id}`,
    method: 'get'
  })
}
//  新建（日常维检）
export function createDailyService(data) {
  return request({
    url: `${MechaUrl}/overhaul/daily/save`,
    method: 'post',
    data
  })
}
//  编辑（维检记录）
export function editDailyService(data) {
  return request({
    url: `${MechaUrl}/overhaul/daily/edit`,
    method: 'post',
    data
  })
}
//  删除（维检记录）
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
    data: qs.stringify(data)
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
    data: qs.stringify(data)
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
//  领用列表
export function getSpareReceiveList(data) {
  return request({
    url: `${MechaUrl}/spare/pick/detail/list`,
    method: 'post',
    data: qs.stringify(data)
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
//  入库列表
export function getSpareStoreList(data) {
  return request({
    url: `${MechaUrl}/spare/storage/detail/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
/** ---- 供电管理 ---- **/

/** ---- 运输管理 ---- **/
// 典型故障知识库
//  列表
export function getTypicalFaultList(data) {
  return request({
    url: `${MechaUrl}/device/fault/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getTypicalFaultInfo(id) {
  return request({
    url: `${MechaUrl}/device/fault/${id}`,
    method: 'get'
  })
}
//  新建
export function createTypicalFault(data) {
  return request({
    url: `${MechaUrl}/device/fault/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editTypicalFault(data) {
  return request({
    url: `${MechaUrl}/device/fault/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delTypicalFault(id) {
  return request({
    url: `${MechaUrl}/device/fault/${id}`,
    method: 'delete'
  })
}
// 历史故障知识库
//  列表
export function getHistoryFaultList(data) {
  return request({
    url: `${MechaUrl}/device/history/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  详情
export function getHistoryFaultInfo(id) {
  return request({
    url: `${MechaUrl}/device/history/${id}`,
    method: 'get'
  })
}
//  新建
export function createHistoryFault(data) {
  return request({
    url: `${MechaUrl}/device/history/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editHistoryFault(data) {
  return request({
    url: `${MechaUrl}/device/history/edit`,
    method: 'post',
    data
  })
}
//  删除
export function delHistoryFault(id) {
  return request({
    url: `${MechaUrl}/device/history/${id}`,
    method: 'delete'
  })
}

/** ---- 机电图件 ---- **/

/** ---- 技术管理 ---- **/

