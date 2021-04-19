import request from '@/utils/request'
import { SafeManagement } from './url'

// 分页 获取风险责任体系列表
export function aqglRiskSystemList(data) {
  return request({
    url: SafeManagement + '/aqglRiskSystem/search',
    method: 'post',
    data
  })
}

// 根据id获取风险责任体系
export function getaqglRiskSystemById(id) {
  return request({
    url: SafeManagement + '/aqglRiskSystem/get/' + id,
    method: 'get',
    id
  })
}

// 保存风险责任体系对象
export function saveAqglRiskSystem(data) {
  return request({
    url: SafeManagement + '/aqglRiskSystem/save',
    method: 'post',
    data
  })
}

// 修改风险责任体系对象
export function updateAqglRiskSystem(data) {
  return request({
    url: SafeManagement + '/aqglRiskSystem/update',
    method: 'post',
    data
  })
}

// 删除风险责任体系对象
export function deleteAqglRiskTissue(id) {
  return request({
    url: SafeManagement + '/aqglRiskSystem/delete/' + id,
    method: 'delete',
    id
  })
}

// 分页 获取患者责任体系列表
export function getAqglHiddenSystem(data) {
  return request({
    url: SafeManagement + '/aqglHiddenSystem/search',
    method: 'post',
    data
  })
}

// 根据id获取患者责任体系
export function getaqglHiddenSystemById(id) {
  return request({
    url: SafeManagement + '/aqglHiddenSystem/get/' + id,
    method: 'get',
    id
  })
}

// 创建患者责任体系
export function saveaqglHiddenSystem(data) {
  return request({
    url: SafeManagement + '/aqglHiddenSystem/save',
    method: 'post',
    data
  })
}

// 修改患者责任体系
export function updateAqglHiddenSystem(data) {
  return request({
    url: SafeManagement + '/aqglHiddenSystem/update',
    method: 'post',
    data
  })
}

// 删除患者责任体系
export function deleteaqglHiddenSystem(id) {
  return request({
    url: SafeManagement + '/aqglHiddenSystem/delete/' + id,
    method: 'delete',
    id
  })
}
