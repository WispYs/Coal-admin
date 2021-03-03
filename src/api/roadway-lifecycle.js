import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/roadway-lifecycle/list',
    method: 'get',
    params
  })
}

