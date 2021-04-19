import request from '@/utils/request'

import { BaseUrl } from './url'

export function getImg(path) {
  return request({
    url: `${BaseUrl}/file/sysFileInfo/url/${path}`,
    method: 'get'
  })
}
