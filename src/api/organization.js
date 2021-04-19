import request from '@/utils/request'
import { SafeManagement } from './url'

// 风险组织机构   分页
export function getRiskOrganization(data) {
  return request({
    url: SafeManagement + '/aqglRiskTissue/search',
    method: 'post',
    data
  })
}

// 根据id获取风险组织机构
export function getAqglRiskTissueById(id) {
  return request({
    url: SafeManagement + '/aqglRiskTissue/get/' + id,
    method: 'get',
    id
  })
}

// 获取对应风险组织下所有子组织,以树形结构返回,不传代表查全部风险组织树
export function getRiskOrganizationSelect(data){
  return request({
    url: SafeManagement + '/aqglRiskTissue/getAqglRiskTissueTree',
    method: 'post',
    data
  })
}

// 获取指定风险组织下的子节点,返回数据中parentCheck为1代表有子节点,为0与之相反
export function getRiskTissueChildTree(id){
  return request({
    url: SafeManagement + '/aqglRiskTissue/findParentId?parentId=' + id,
    method: 'post',
    id
  })
}

// 保存风险组织机构对象
export function saveAqglRiskTissue(data){
  return request({
    url: SafeManagement + '/aqglRiskTissue/save',
    method: 'post',
    data
  })
}

// 更新风险组织机构对象
export function updateAqglRiskTissue(data){
  return request({
    url: SafeManagement + '/aqglRiskTissue/update',
    method: 'post',
    data
  })
}

// 更新风险组织机构对象
export function deleteAqglRiskTissue(id){
  return request({
    url: SafeManagement + '/aqglRiskTissue/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取隐患组织机构  分页
export function getAqglHiddenTissue(data){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/search',
    method: 'post',
    data
  })
}

// 根据id获取隐患组织机构
export function getAqglHiddenTissueById(id){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/get/' + id,
    method: 'get',
    id
  })
}

// 保存隐患组织机构
export function saveAqglHiddenTissue(data){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/save',
    method: 'post',
    data
  })
}

// 更新隐患组织机构
export function updateaqglHiddenTissue(data){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/update',
    method: 'post',
    data
  })
}

// 删除隐患组织机构
export function deleteaqglHiddenTissue(id){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取隐患组织机构树
export function getAqglHiddenTissueTree(data){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/getAqglHiddenTissueTree',
    method: 'post',
    data
  })
}

// 获取指定隐患组织下的子节点,返回数据中parentCheck为1代表有子节点,0与之相反
export function getHiddenTissueChildTree(id){
  return request({
    url: SafeManagement + '/aqglHiddenTissue/findParentId?parentId=' + id,
    method: 'post',
    id
  })
}
