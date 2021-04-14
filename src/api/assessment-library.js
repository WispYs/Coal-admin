import request from '@/utils/request'
import { SafeManagement } from './url'

//获取便是库 分页
export function getAqglRiskIdentifyList(data) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/search',
    method: 'post',
    data
  })
}

// 更新风险辨识库
// export function updateAqglRiskIdentify(data) {
//   return request({
//     url: SafeManagement + '/aqglRiskIdentify/update',
//     method: 'post',
//     data
//   })
// }
