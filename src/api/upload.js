// 应急救援
import request from '@/utils/request'
import { FileUrl } from './url'

// 根据上传返回eventId查询附件url
export function getFileNameByEventId(data) {
  return request({
    url: `${FileUrl}/sysFileInfo/listByEventIds`,
    method: 'post',
    data
  })
}
