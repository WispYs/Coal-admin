import request from '@/utils/request'
import { SystemUrl, FlowUrl, BaseUrl, FlowManagementUrl } from './url'
import qs from 'qs'

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
    url: `${FlowManagementUrl}/save`,
    method: 'post',
    data
  })
}

// 获取流程管理表数据
export function getFlowTableData(data) {
  return request({
    url: `${FlowManagementUrl}/search`,
    method: 'post',
    data
  })
}

// 获取业务表
export function findTable() {
  return request({
    url: `${FlowManagementUrl}/findTable`,
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
    url: `${FlowManagementUrl}/delete/${entityId}`,
    method: 'delete'
  })
}

// 更新流程
export function updataProcess(data) {
  return request({
    url: `${FlowManagementUrl}/update`,
    method: 'post',
    data
  })
}

// 批量删除
export function deleteBatches(data) {
  return request({
    url: `${FlowManagementUrl}/delete`,
    method: 'delete',
    data
  })
}

//  待办流程  //
//  列表
export function getTodoProcessList(data) {
  return request({
    url: `${FlowUrl}/workVue/loadCurrentUserVueTask`,
    method: 'post',
    data
  })
}
//  查询任务处理方式（连线信息）
export function getHandleType(params) {
  return request({
    url: `${FlowUrl}/workVue/toDoVueTask`,
    method: 'get',
    params
  })
}
//  提交待办任务批注
export function updateTask(data) {
  return request({
    url: `${FlowUrl}/workVue/completeVueTask`,
    method: 'post',
    data
  })
}
//  查询任务批注信息
export function getHandleTaskList(params) {
  return request({
    url: `${FlowUrl}/workVue/loadCommentsByVueTaskId`,
    method: 'get',
    params
  })
}
// //  获取流程图
// export function getHandleTaskImg(params) {
//   return request({
//     url: `${FlowUrl}/workflow/toViewProcessByTaskId`,
//     method: 'get',
//     params
//   })
// }
//  流程实例  //
//  列表
export function getProcessExampleList(data) {
  return request({
    url: `${FlowUrl}/workVue/instanceQuery`,
    method: 'post',
    data
  })
}
//  挂起/激活
export function suspendProcess(id) {
  return request({
    url: `${FlowUrl}/workVue/suspended?processInstanceId=${id}`,
    method: 'post'
  })
}
//  委托
export function appointProcess(data) {
  return request({
    url: `${FlowUrl}/workVue/entrustVueTask`,
    method: 'get',
    data
  })
}
//  跳转指定活动节点
export function jumpProcessNode(data) {
  return request({
    url: `${FlowUrl}/workVue/jump`,
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取任务节点列表
export function getProcessNodeList(id) {
  return request({
    url: `${FlowUrl}/workConfiguration/viewProgress?processDefinitionId=${id}`,
    method: 'get'
  })
}
