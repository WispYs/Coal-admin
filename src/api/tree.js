import request from '@/utils/request'
import { SystemUrl, FileUrl } from './url'

// 获取部门树
export function getTree(params) {
  return request({
    url: `${SystemUrl}/sysDept/getSysDeptTree`,
    method: 'post',
    params
  })
}

// 获取文件夹树
export function getFolderTree(fId) {
  return request({
    url: `${FileUrl}/sysFileDict/recurse/${fId}`,
    method: 'get'
  })
}
