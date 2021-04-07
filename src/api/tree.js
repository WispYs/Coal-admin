import request from '@/utils/request'
import { SystemUrl } from './url'

export function getTree(params) {
  return request({
    url: `${SystemUrl}/sysDept/getSysDeptTree`,
    method: 'post',
    params
  })
}
