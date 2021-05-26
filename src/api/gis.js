import request from '@/utils/request'
import { GisUrl, GisLocalAddress, GisServerUrl } from './url'
// export function getViewPoint() {
//   return request({
//     url: `${GisUrl}/anchor/list`,
//     method: 'get'

//   })
// }

// export function getPointInfo(id) {
//   return request({
//     url: `${GisUrl}/anchor/get`,
//     method: 'get',
//     params: { id }
//   })
// }

export function getAllViews(model) {
  const { projectID, modelID } = { ...model }
  return request({
    url: `${GisServerUrl}/prj/GetAllViews?ProjectID=${projectID}&ModelID=${modelID}`,
    method: 'get'

  })
}

export function GetViewCategory(model) {
  const { projectID, modelID, versionNO, viewID } = { ...model }
  return request({
    url: `${GisServerUrl}/Model/ GetViewCategory?ProjectID=${projectID}&ModelID=${modelID}&VersionNO=${versionNO}&BaseViewID=${viewID}`,
    method: 'get'

  })
}

export function getViewPoint() {
  return request({
    url: '/gis/viewPoint',
    method: 'get'

  })
}

export function getPointInfo(id) {
  return request({
    url: '/gis/pointInfo',
    method: 'get',
    params: { id }
  })
}
