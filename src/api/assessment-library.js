import request from '@/utils/request'
import { SafeManagement } from './url'

//获取辨识库列表 分页
export function getAqglRiskIdentifyList(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/search',
    method: 'post',
    data
  })
}

//根据id获取辨识库
export function getAqglRiskIdentifyById(id) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/get/' + id,
    method: 'get',
    id
  })
}

//保存辨识库
export function saveAqglRiskIdentify(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/save',
    method: 'post',
    data
  })
}

// 更新风险辨识库
export function updateAqglRiskIdentify(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/update',
    method: 'post',
    data
  })
}

// 删除风险辨识库
export function deleteAqglRiskIdentify(id) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量删除分险辨识库
export function batchDeleteRiskIdentify(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

// 获取安全风险管控落实情况列表 分页
export function getRiskMeasures(data) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/search',
    method: 'post',
    data
  })
}

// 保存安全风险管控落实情况
export function saveRiskMeasures(data) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/save',
    method: 'post',
    data
  })
}

// 根据id 获取安全风险管控落实情况
export function getRiskMeasuresById(id) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/get/' + id,
    method: 'get',
    id
  })
}

// 更改 安全风险管控落实情况
export function editRiskMeasures(data) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/update',
    method: 'post',
    data
  })
}

//根据id删除 安全风险管控落实情况
export function deleteRiskMeasures(id) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/delete/' + id,
    method: 'delete',
    id
  })
}

//根据id 批量删除 安全风险管控落实情况
export function batchDeleteRiskMeasures(data) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}
