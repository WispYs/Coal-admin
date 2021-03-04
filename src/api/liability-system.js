import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/liability-system/list',
    method: 'get',
    params
  })
}

