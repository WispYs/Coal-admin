import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/example/table/list',
    method: 'get',
    params
  })
}

export function getNestList() {
  return request({
    url: '/example/nest-table/list',
    method: 'get'
  })
}
