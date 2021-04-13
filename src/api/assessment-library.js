import request from '@/utils/request'
import { SafeManagement } from './url'

export function getAqglRiskIdentifyList(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/search',
    method: 'post',
    data
  })
}

