import request from '@/utils/request'
import { SafeManagement,SystemUrl } from './url'

//根据父id获取数据字典
export function getsysDictListById(id) {
  return request({
    url: SystemUrl + '/sysDict/findParentId?parentId=' + id,
    method: 'post',
    id
  })
}

//辨识结束
export function endRiskRecognize(id) {
  return request({
    url: SafeManagement + '/aqglRiskIdentify/riskRecognize?aqglRiskIdentifyId=' + id,
    method: 'post',
    id
  })
}

//获取三违登记列表  分页
export function getAqglThreeRegisterList(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/search',
    method: 'post',
    data
  })
}

//根据id获取三违登记
export function getAqglThreeRegisterById(id) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/get/' + id,
    method: 'get',
    id
  })
}

//保存三违登记
export function saveAqglThreeRegister(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/save',
    method: 'post',
    data
  })
}

//更新三违登记
export function updateAqglThreeRegister(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/update',
    method: 'post',
    data
  })
}

//更新三违登记
export function deleteaqglThreeRegister(id) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量删除 三违登记
export function batchDeleteThreeRegister(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

// 获取三违登记模板
export function downloadThreeRegisterTemplate(data) {
  return request({
    responseType: 'blob',
    url: SafeManagement + '/aqglThreeRegister/downloadTemplate?fileName=' + data.fileName + '&filePath=' + data.filePath,
    method: 'get',
    data
  })
}

//获取事故隐患登记
export function getAqglHiddenRegister(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/search',
    method: 'post',
    data
  })
}

//根据id获取事故隐患登记
export function getAqglHiddenRegisterById(id) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/get/' + id,
    method: 'get',
    id
  })
}

//保存事故隐患登记
export function saveAqglHiddenRegister(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/save',
    method: 'post',
    data
  })
}

//更新事故隐患登记
export function updateAqglHiddenRegister(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/update',
    method: 'post',
    data
  })
}

//根据id删除事故隐患登记
export function deleteAqglHiddenRegister(id) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除事故隐患登记
export function batchDeleteHiddenRegister(ids) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

// 送审复查
export function saveHiddenMeasure(data) {
  return request({
    url: SafeManagement + '/aqglHiddenMeasure/save',
    method: 'post',
    data
  })
}

// 延时审批
export function saveReviewMsg(data) {
  return request({
    url: SafeManagement + '/aqglReviewMsg/save',
    method: 'post',
    data
  })
}

// 更新督办状态
export function updateSuperviseStatus(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/updateSuperviseStatus',
    method: 'post',
    data
  })
}


//隐患清单  分页
export function getHiddenRegisterDetailList(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/hiddenRegisterDetail',
    method: 'post',
    data
  })
}

//获取 隐患清单详情
export function getHiddenRegisterDetails(id) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/getDetails?id=' + id,
    method: 'post',
    id
  })
}

//隐患统计分析  年
export function getHiddenRegisterYearCount(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/hiddenRegisterYearCount?year=' + data.year,
    method: 'post',
    data
  })
}

//隐患统计分析 日期、隐患级别、隐患部门、隐患状态
export function gethiddenRegisterCount(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/hiddenRegisterCount?beginTime=' + data.beginTime + '&endTime=' + data.endTime + '&type=' + data.type,
    method: 'post',
    data
  })
}

//三违分析 按年分析
export function getThreeRegisterYear(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/threeTendency?year=' + data.year,
    method: 'post',
    data
  })
}

//三违分析 按类型时间分析
export function getThreeRegisterCount(data) {
  return request({
    url: SafeManagement + '/aqglThreeRegister/groupBySeverity?beginTime=' + data.beginTime + '&endTime=' + data.endTime + '&type=' + data.type,
    method: 'post',
    data
  })
}

//获取三证一照列表
export function getAqglThreePhoto(data) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/search',
    method: 'post',
    data
  })
}

//根据id获取三证一照
export function getaqglThreePhotoById(id) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/get/' + id,
    method: 'get',
    id
  })
}

//更新三证一照
export function updateAqglThreePhoto(data) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/update',
    method: 'post',
    data
  })
}

//保存三证一照
export function saveAqglThreePhoto(data) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/save',
    method: 'post',
    data
  })
}

//删除三证一照
export function deleteaqglThreePhoto(id) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除三证一照
export function batchDeleteThreePhoto(data) {
  return request({
    url: SafeManagement + '/aqglThreePhoto/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//事故教育警示教育  分页
export function getAqglAccident(data) {
  return request({
    url: SafeManagement + '/aqglAccident/search',
    method: 'post',
    data
  })
}

//根据id获取事故教育警示教育
export function getAqglAccidentById(id) {
  return request({
    url: SafeManagement + '/aqglAccident/get/' + id,
    method: 'get',
    id
  })
}

//新建 事故教育警示教育
export function saveAqglAccident(data) {
  return request({
    url: SafeManagement + '/aqglAccident/save',
    method: 'post',
    data
  })
}

//更新 事故教育警示教育
export function updateAqglAccident(data) {
  return request({
    url: SafeManagement + '/aqglAccident/update',
    method: 'post',
    data
  })
}

//根据id删除  事故教育警示教育
export function deleteAqglAccidentById(id) {
  return request({
    url: SafeManagement + '/aqglAccident/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除  事故教育警示教育
export function batchDeleteAqglAccident(data) {
  return request({
    url: SafeManagement + '/aqglAccident/batchDelete?entityIds= ' + data,
    method: 'post',
    data
  })
}

//更新 员工培训台帐
export function getAqglEmployeesParameter(data) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/search',
    method: 'post',
    data
  })
}

//根据id获取员工培训台帐
export function getAqglEmployeesParameterById(id) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/get/' + id,
    method: 'get',
    id
  })
}

//保存员工培训台帐
export function saveAqglEmployeesParameter(data) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/save',
    method: 'post',
    data
  })
}

//更新员工培训台帐
export function updateAqglEmployeesParameter(data) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/update',
    method: 'post',
    data
  })
}

//根据id删除 员工培训台帐
export function deleteAqglEmployeesParameterById(id) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除  员工培训台帐
export function batchDeleteAqglEmployeesParameter(data) {
  return request({
    url: SafeManagement + '/aqglEmployeesParameter/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取全部风险点信息
export function getSelectRiskList(data) {
  return request({
    url: SafeManagement + '/aqglAddress/getSelectCombox',
    method: 'post',
    data
  })
}
