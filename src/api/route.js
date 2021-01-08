import request from '@/utils/request'

export function getRoutes(token) {
  return request({
    url: '/example/route',
    method: 'get',
    params: { token }
  })
}
