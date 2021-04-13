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
