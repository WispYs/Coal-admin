import request from '@/utils/request'
import { SafeManagement } from './url'

/** ---- 生产调度 ---- **/
//  公文公告  //
//  列表
export function getDispatchAnnounceList(data) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/search`,
    method: 'post',
    data
  })
}
//  详情
export function getDispatchAnnounceInfo(id) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/get/${id}`,
    method: 'get'
  })
}
//  新建
export function createDispatchAnnounce(data) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editDispatchAnnounce(data) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/update`,
    method: 'post',
    data
  })
}
//  删除
export function delDispatchAnnounce(id) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/delete/${id}`,
    method: 'delete'
  })
}
//  批量删除
export function batchDeleteDispatchAnnounce(data) {
  return request({
    url: `${SafeManagement}/scddAnnouncement/delete`,
    method: 'delete',
    data
  })
}

//  调度下派任务
//  列表
export function getDispatchZdhldxprwjlList(data) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/search`,
    method: 'post',
    data
  })
}
//  详情
export function getDispatchZdhldxprwjlInfo(id) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/get/${id}`,
    method: 'get'
  })
}
//  新建
export function createDispatchZdhldxprwjl(data) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/save`,
    method: 'post',
    data
  })
}
//  编辑
export function editDispatchZdhldxprwjl(data) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/update`,
    method: 'post',
    data
  })
}
//  删除
export function delDispatchZdhldxprwjl(id) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/delete/${id}`,
    method: 'delete'
  })
}
//  批量删除
export function batchDeleteDispatchZdhldxprwjl(data) {
  return request({
    url: `${SafeManagement}/scddDispatchTask/delete`,
    method: 'delete',
    data
  })
}

