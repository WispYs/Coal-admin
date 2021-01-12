import request from '@/utils/request'

export function getLineData() {
  return request({
    url: '/example/dashboard/line-data',
    method: 'get'
  })
}
