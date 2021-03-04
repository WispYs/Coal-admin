import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/organization/list',
    method: 'get',
    params
  })
}

