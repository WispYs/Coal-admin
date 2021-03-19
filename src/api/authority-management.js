import request from '@/utils/request'

export function getApplicationList(params) {
  return request({
    url: '/application/list',
    method: 'get',
    params
  })
}

