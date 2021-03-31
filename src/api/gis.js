import request from '@/utils/request'

export function getViewPoint() {
  return request({
    url: '/gis/viewPoint',
    method: 'get'

  })
}

export function getPointInfo(id) {
  return request({
    url: '/gis/pointInfo',
    method: 'get',
    params: { id }
  })
}

