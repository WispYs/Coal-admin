import request from '@/utils/request'

export function getLineData() {
  return request({
    url: '/example/dashboard/statistic-data',
    method: 'get'
  })
}
