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
