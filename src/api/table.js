import request from '@/utils/request'

import { FileUrl } from './url'

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

export function getReportList() {
  return request({
    url: '/example/report-table/list',
    method: 'get'
  })
}
