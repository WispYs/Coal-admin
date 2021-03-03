import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/working-lifecycle/list',
    method: 'get',
    params
  })
}

