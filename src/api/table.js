import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/example/table/list',
    method: 'get',
    params
  })
}
