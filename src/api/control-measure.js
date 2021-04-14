import request from '@/utils/request'
import { SafeManagement } from './url'

export function getAqglRiskMeasures(data) {
  return request({
    url: SafeManagement + '/aqglRiskMeasures/search',
    method: 'post',
    data
  })
}
