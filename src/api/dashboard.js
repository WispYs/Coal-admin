import request from '@/utils/request'
import {
  SafeManagement
} from './url'

export function getLineData() {
  return request({
    url: '/example/dashboard/statistic-data',
    method: 'get'
  })
}

// 风险分析
export function getRiskCount(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/riskCount?beginTime=' + data.beginTime + '&endTime=' + data.endTime +
      '&major=' + data.major + '&riskType=' + data.riskType,
    method: 'post',
    data
  })
}
