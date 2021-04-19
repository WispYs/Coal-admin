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

//隐患清单  分页
export function getHiddenRegisterDetailList(data) {
  return request({
    url: SafeManagement + '/aqglHiddenRegister/hiddenRegisterDetail',
    method: 'post',
    data
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
