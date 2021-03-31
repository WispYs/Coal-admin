import request from '@/utils/request'
import { BaseUrl } from './url.js'

export function login(data) {
  return request({
    url: '/example/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/example/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/example/user/logout',
    method: 'post'
  })
}

// export function login(data) {
//   return request({
//     url: `${BaseUrl}/auth/login`,
//     method: 'post',
//     // headers: { 'Content-Type': 'multipart/form-data' },
//     data: {
//       loginName: data.username,
//       password: data.password
//     }

//   })
// }

// export function getInfo(token) {
//   return request({
//     url: `${BaseUrl}/admin/sysUser/getInfo`,
//     method: 'get'
//   })
// }

