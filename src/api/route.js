import request from '@/utils/request'
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
    url: `${baseUrl}/admin/sysMenu/getMenuTree?parentId=1`,
    method: 'get'
  })
}
