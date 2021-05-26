import request from '@/utils/request'
import { IntelligentSearchUrl, SystemUrl, FileUrl } from './url'

// 获取文件结果
export function getFolderResult(data) {
  return request({
    url: `${IntelligentSearchUrl}/sysFileInfoIndex/search`,
    method: 'post',
    data
  })
}

// 获取菜单结果
export function getMenuResult(data) {
  return request({
    url: `${SystemUrl}/sysMenu/search`,
    method: 'post',
    data
  })
}

// 通过文件名获取文件
export function getFileByFileName(fId) {
  // return request({
  //   url: `${BaseUrl}/file/sysFileInfo/url/${path}`,
  //   method: 'get'
  // })

  window.open(`${FileUrl}/preview?entityId=${fId}`)
}
