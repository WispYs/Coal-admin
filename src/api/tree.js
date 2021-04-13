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
export function getFolderTree(fId, menuId) {
  return request({
    url: `${FileUrl}/sysFileDict/recurse/${menuId}`,
    method: 'get'
  })
}
