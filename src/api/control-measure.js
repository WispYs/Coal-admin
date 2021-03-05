import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/control-measure/list',
    method: 'get',
    params
  })
}

