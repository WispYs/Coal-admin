import request from '@/utils/request'

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
