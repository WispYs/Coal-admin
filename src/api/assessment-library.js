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
