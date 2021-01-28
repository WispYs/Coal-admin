import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/example/table/list',
    method: 'get',
    params
  })
}

export function getMultList() {
  return request({
    url: '/example/mult-table/list',
    method: 'get'
  })
}

export function getUploadList() {
  return request({
    url: '/example/upload-table/list',
    method: 'get'
  })
}
