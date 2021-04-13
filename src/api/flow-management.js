import request from '@/utils/request'
import { SystemUrl, FlowUrl, BaseUrl } from './url'

// 应用管理系统
export function getApplicationList(data) {
  return request({
    url: `${SystemUrl}/sysManage/search`,
    method: 'post',
    data
  })
}

// 保存流程
export function saveFlow(data) {
  return request({
    url: `${SystemUrl}/actFlowDeploy/save`,
    method: 'post',
    data
  })
}

// 获取流程管理表数据
export function getFlowTableData(data) {
  return request({
    url: `${SystemUrl}/actFlowDeploy/search`,
    method: 'post',
    data
  })
}

// 获取业务表
export function findTable() {
  return request({
    url: `${SystemUrl}/actFlowDeploy/findTable`,
    method: 'post'
  })
}

// 获取流程
export function findProcess() {
  return request({
    url: `${FlowUrl}/workflow/findProcessDefinition`,
    method: 'get'
  })
}

// 删除流程
export function delProcess(entityId) {
  return request({
    url: `${BaseUrl}/admin/actFlowDeploy/delete/${entityId}`,
    method: 'delete'
  })
}

// 更新流程
export function updataProcess(data) {
  return request({
    url: `${BaseUrl}/admin/actFlowDeploy/update`,
    method: 'post',
    data
  })
}
