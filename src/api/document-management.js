import request from '@/utils/request'

import { FileUrl } from './url'

// 获取上传文件列表
export function getUploadList(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/search`,
    method: 'post',
    data
  })
}

// 更新文件信息
export function updateDocument(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/update`,
    data,
    method: 'post'
  })
}

// 下载文件
export function downloadDocument(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/download`,
    data,
    method: 'post',
    responseType: 'blob'
  })
}

// 删除文件
export function deleteDocument(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/delete`,
    data,
    method: 'delete'
  })
}

// 新增文件夹
export function addFolder(data) {
  return request({
    url: `${FileUrl}/sysFileDict/save`,
    data,
    method: 'post'
  })
}

// 升级文件夹
export function updateFolder(data) {
  return request({
    url: `${FileUrl}/sysFileDict/update`,
    data,
    method: 'post'
  })
}

// 删除文件夹
export function deleteFolder(fId) {
  return request({
    url: `${FileUrl}/sysFileDict/delete/${fId}`,
    method: 'delete'
  })
}
