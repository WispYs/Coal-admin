import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/assessment-library/list',
    method: 'get',
    params
  })
}

