import request from '@/utils/request'
import { BaseUrl, SystemUrl } from './url.js'

// 登录
// export function login(data) {
//   return request({
//     url: `${BaseUrl}/auth/login`,
//     method: 'post',
//     data
//   })
// }
// 登录接口
// export function authLogin(data) {
//   return request({
//     url: `${BaseUrl}/auth/login`,
//     method: 'post',
//     data
//   })
// }

// 登出
export function logout() {
  return request({
    url: `${BaseUrl}/auth/logout`,
    method: 'get'
  })
}

// 获取用户信息
// export function getInfo(token) {
//   return request({
//     url: `${BaseUrl}/admin/sysUser/getInfo`,
//     method: 'get'
//   })
// }

// 设置用户快捷导航
export function setCollectMenu(data) {
  return request({
    url: `${SystemUrl}/cfgNavigation/save`,
    method: 'post',
    data
  })
}
// 删除用户快捷导航
export function delCollectMenu(id) {
  return request({
    url: `${SystemUrl}/cfgNavigation/deleteMenuId/${id}`,
    method: 'delete'
  })
}
// 获取用户快捷导航
// export function getCollectMenu() {
//   return request({
//     url: `${SystemUrl}/cfgNavigation/findNavigationByUserId`,
//     method: 'get'
//   })
// }

/* mock api */
// 登录
export function authLogin(data) {
  return request({
    url: '/example/user/login',
    method: 'post',
    data
  })
}
//  获取用户信息
export function getInfo(token) {
  return request({
    url: '/example/user/info',
    method: 'get',
    params: { token }
  })
}
//  获取用户快捷导航
export function getCollectMenu() {
  return request({
    url: '/example/user/collect-menu',
    method: 'get'
  })
}
