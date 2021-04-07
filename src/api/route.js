import request from '@/utils/request'
import { SystemUrl } from './url'
import baseUrl from './url.js'

// export function getRoutes(token) {
//   return request({
//     url: '/example/route',
//     method: 'get',
//     params: { token }
//   })
// }

export function getRoutes(token) {
  return request({
    url: `${SystemUrl}/sysMenu/getMenuTree`,
    params: { 'token': token, 'parentId': 1 },
    method: 'post'
  })
}
