import request from '@/utils/request'
import { SafeManagement } from './url'

//获取超前物探信息 分页
export function getDcfzsDetectInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/search',
    method: 'post',
    data
  })
}

//根据id 获取 超前物探信息
export function getDetectInfoById(id) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/get/' + id,
    method: 'get',
    id
  })
}

//保存超前物探信息
export function saveDcfzsDetectInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/save',
    method: 'post',
    data
  })
}

//更新 超前物探信息
export function updateDcfzsDetectInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/update',
    method: 'post',
    data
  })
}

//根据id 删除 超前物探信息
export function deleteDcfzsDetectInfo(id) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量删除 超前物探信息
export function batchDeleteDetectInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfo/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}


//获取物探明细 分页
export function getDetectInfoDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/search',
    method: 'post',
    data
  })
}

//根据id 获取 超前物探明细信息
export function getDetectInfoDetailById(id) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/get/' + id,
    method: 'get',
    id
  })
}

//更新超前物探明细信息
export function editDetectInfoDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/update',
    method: 'post',
    data
  })
}

//保存超前物探明细信息
export function saveDetectInfoDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/save',
    method: 'post',
    data
  })
}

//更新超前物探明细信息
export function deleteDetectInfoDetail(id) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量  删除  超前物探明细信息
export function batchDeleteDetectInfoDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsDetectInfoDetail/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 巷道贯通管理列表 分页
export function searchTunnelThrough(data) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/search',
    method: 'post',
    data
  })
}

//创建 巷道贯通管理
export function saveTunnelThrough(data) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/save',
    method: 'post',
    data
  })
}

//根据id获取 巷道贯通管理
export function getTunnelThroughById(id) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/get/' + id,
    method: 'get',
    id
  })
}

//更新 巷道贯通管理
export function updateTunnelThrough(data) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/update',
    method: 'post',
    data
  })
}

//删除 巷道贯通管理
export function deleteTunnelThrough(id) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 巷道贯通管理
export function batchDeleteTunnelThrough(ids) {
  return request({
    url: SafeManagement + '/dcfzsTunnelThrough/batchDelte?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//创建 沉陷观测
export function saveSinkRecord(data) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/save',
    method: 'post',
    data
  })
}

//获取 沉陷观测列表 分页
export function getSinkRecordList(data) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/search',
    method: 'post',
    data
  })
}

//删除 沉陷观测
export function deleteSinkRecord(id) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 沉陷观测
export function batchDeleteSinkRecord(ids) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//根据id 获取 沉陷观测
export function getSinkRecordById(id) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/get/' + id,
    method: 'get',
    id
  })
}

//更新 沉陷观测
export function updateSinkRecord(data) {
  return request({
    url: SafeManagement + '/dcfzsSinkRecord/update',
    method: 'post',
    data
  })
}

//获取水质分析台账列表 分页
export function getWaterInfoList(data) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/search',
    method: 'post',
    data
  })
}

//保存 水质分析台账
export function saveWaterInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/save',
    method: 'post',
    data
  })
}

//更新 水质分析台账
export function updateWaterInfo(data) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/update',
    method: 'post',
    data
  })
}

//根据id获取 水质分析台账
export function getWaterInfoById(id) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/get/' + id,
    method: 'get',
    id
  })
}

//根据id删除 水质分析台账
export function deleteWaterInfo(id) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/delete/' + id,
    method: 'delete',
    id
  })
}

//根据id批量删除 水质分析台账
export function batchDeleteWaterInfo(ids) {
  return request({
    url: SafeManagement + '/dcfzsWaterInfo/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//获取 水质分析台账 样本数据列表 分页
export function getZwitterionList(data) {
  return request({
    url: SafeManagement + '/dcfzsZwitterion/search',
    method: 'post',
    data
  })
}

//根据id获取 水质分析台账 样本数据
export function getZwitterionById(id) {
  return request({
    url: SafeManagement + '/dcfzsZwitterion/get/' + id,
    method: 'get',
    id
  })
}

//更新 水质分析台账 样本数据列表
export function editZwitterionDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsZwitterion/update',
    method: 'post',
    data
  })
}

//保存 水质分析台账 样本数据列表
export function saveZwitterionDetail(data) {
  return request({
    url: SafeManagement + '/dcfzsZwitterion/save',
    method: 'post',
    data
  })
}

//根据id删除 水质分析台账 样本数据
export function deleteZwitterionDetail(id) {
  return request({
    url: SafeManagement + '/dcfzsZwitterion/delete/' + id,
    method: 'delete',
    id
  })
}
