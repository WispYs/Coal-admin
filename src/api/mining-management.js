import request from '@/utils/request'
import { SafeManagement } from './url'

//获取矿井基础信息列表 分页
export function getMineBasicinfoList(data) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/search',
    method: 'post',
    data
  })
}

//根据id获取 矿井基础信息
export function getMineBasicinfoById(id) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/get/' + id ,
    method: 'get',
    id
  })
}

//更新矿井基础信息
export function updateMineBasicinfo(data) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/update',
    method: 'post',
    data
  })
}

//保存 矿井基础信息
export function saveMineBasicinfo(data) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/save',
    method: 'post',
    data
  })
}

//删除 矿井基础信息
export function deleteMineBasicinfo(id) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 矿井基础信息
export function batchDeleteMineBasicinfo(data) {
  return request({
    url: SafeManagement + '/cjglMineBasicinfo/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 煤层编号信息
export function getCoalcodeInfoList(data) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/search',
    method: 'post',
    data
  })
}

//获取 煤层编号信息列表
export function selectCoalcodeInfoList(data) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/selectCombox',
    method: 'post',
    data
  })
}


//根据 id 获取 煤层编号信息
export function getCoalcodeInfoById(id) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/get/' + id,
    method: 'get',
    id
  })
}

//保存 煤层编号信息
export function saveCoalcodeInfo(data) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/save',
    method: 'post',
    data
  })
}

//更新 煤层编号信息
export function updateCoalcodeInfo(data) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/update',
    method: 'post',
    data
  })
}

//删除 煤层编号信息
export function deleteCoalcodeInfo(id) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 煤层编号信息
export function batchCoalcodeInfo(data) {
  return request({
    url: SafeManagement + '/cjglCoalcodeInfo/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 水平基本信息  分页
export function getLevelInfoList(data) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/search',
    method: 'post',
    data
  })
}

//获取 水平基本信息列表
export function selectLevelInfo(data) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/selectCombox',
    method: 'post',
    data
  })
}

//保存 水平基本信息
export function saveLevelInfo(data) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/save',
    method: 'post',
    data
  })
}

//更新 水平基本信息
export function updateLevelInfo(data) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/update',
    method: 'post',
    data
  })
}

//根据id获取 水平基本信息
export function getLevelInfoById(id) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/get/' + id,
    method: 'get',
    id
  })
}

//删除  水平基本信息
export function deleteLevelInfo(id) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除  水平基本信息
export function batchDeleteLevelInfo(data) {
  return request({
    url: SafeManagement + '/cjglLevelInfo/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 采区基本信息 分页
export function getMineareaInfoList(data) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/search',
    method: 'post',
    data
  })
}

//获取 采区基本信息列表
export function selectMineareaInfoList(data) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/selectCombox',
    method: 'post',
    data
  })
}

//保存 采区基本信息
export function saveMineareaInfo(data) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/save',
    method: 'post',
    data
  })
}

//根据id获取 采区基本信息
export function getMineareaInfoById(id) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/get/' + id,
    method: 'get',
    id
  })
}

//更新 采区基本信息
export function updateMineareaInfo(data) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/update',
    method: 'post',
    data
  })
}

//删除 采区基本信息
export function deleteMineareaInfo(id) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 采区基本信息
export function batchDeleteMineareaInfo(data) {
  return request({
    url: SafeManagement + '/cjglMineareaInfo/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 采煤队基本信息 分页
export function getMineTeamList(data) {
  return request({
    url: SafeManagement + '/cjglMineTeam/search',
    method: 'post',
    data
  })
}

// 获取采煤队队组名称信息
export function selectMineTeamList(data) {
  return request({
    url: SafeManagement + '/cjglMineTeam/selectCombox',
    method: 'post',
    data
  })
}

//保存 采煤队基本信息
export function saveMineTeam(data) {
  return request({
    url: SafeManagement + '/cjglMineTeam/save',
    method: 'post',
    data
  })
}

//根据id获取 采煤队基本信息
export function getMineTeamById(id) {
  return request({
    url: SafeManagement + '/cjglMineTeam/get/' + id,
    method: 'get',
    id
  })
}

//更新 采煤队基本信息
export function updateMineTeam(data) {
  return request({
    url: SafeManagement + '/cjglMineTeam/update',
    method: 'post',
    data
  })
}

//删除 采煤队基本信息
export function deleteMineTeam(id) {
  return request({
    url: SafeManagement + '/cjglMineTeam/delete/' + id,
    method: 'delete',
    id
  })
}

//删除 采煤队基本信息
export function batchDeleteMineTeam(data) {
  return request({
    url: SafeManagement + '/cjglMineTeam/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

//获取 采掘修队伍信息 分页
export function getDugrepairTeam(data) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/search',
    method: 'post',
    data
  })
}

//获取 采掘修队伍信息列表
export function selectComboxDugrepairTeam(data) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/selectCombox',
    method: 'post',
    data
  })
}

//保存 采掘修队伍信息
export function saveDugrepairTeam(data) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/save',
    method: 'post',
    data
  })
}

//根据id 获取 采掘修队伍信息
export function getDugrepairTeamById(id) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/get/' + id,
    method: 'get',
    id
  })
}

//更新 采掘修队伍信息
export function updateDugrepairTeam(data) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/update',
    method: 'post',
    data
  })
}

//根据id删除 采掘修队伍信息
export function deleteDugrepairTeam(id) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 采掘修队伍信息
export function batchDeleteDugrepairTeam(ids) {
  return request({
    url: SafeManagement + '/cjglDugrepairTeam/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//获取 工作面管理列表 分页
export function getWorkFacetList(data) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/search',
    method: 'post',
    data
  })
}

//获取 工作面管理信息列表
export function selectWorkFacetList(data) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/selectCombox',
    method: 'post',
    data
  })
}

//获取 工作面管理信息 根据id
export function getWorkFacetById(id) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/get/' + id,
    method: 'get',
    id
  })
}

//保存 工作面管理信息
export function saveWorkFacet(data) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/save',
    method: 'post',
    data
  })
}

//更新 工作面管理信息
export function updateWorkFacet(data) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/update',
    method: 'post',
    data
  })
}

//删除 工作面管理信息
export function deleteWorkFacet(id) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/delete/' + id,
    method: 'delete',
    id
  })
}

//批量删除 工作面管理信息
export function batchDeleteWorkFacet(ids) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//获取 工作面进度信息
export function getProcessWorkFacet(id) {
  return request({
    url: SafeManagement + '/cjglWorkFacet/getProcess?gzmNameId=' + id,
    method: 'post',
    id
  })
}

//获取 巷道管理信息列表  分页
export function searchTunnelList(data) {
  return request({
    url: SafeManagement + '/cjglTunnel/search',
    method: 'post',
    data
  })
}

//获取 巷道管理信息列表
export function selectTunnelList(data) {
  return request({
    url: SafeManagement + '/cjglTunnel/selectCombox',
    method: 'post',
    data
  })
}

//保存 巷道管理信息
export function saveTunnel(data) {
  return request({
    url: SafeManagement + '/cjglTunnel/save',
    method: 'post',
    data
  })
}

//根据id获取 巷道管理信息
export function getTunnelById(id) {
  return request({
    url: SafeManagement + '/cjglTunnel/get/' + id,
    method: 'get',
    id
  })
}

//更新 巷道管理信息
export function updateTunnel(data) {
  return request({
    url: SafeManagement + '/cjglTunnel/update',
    method: 'post',
    data
  })
}

//根据id 删除 巷道管理信息
export function deleteTunnel(id) {
  return request({
    url: SafeManagement + '/cjglTunnel/delete/' + id,
    method: 'delete',
    id
  })
}

//根据id 批量删除 巷道管理信息
export function batchDeleteTunnel(ids) {
  return request({
    url: SafeManagement + '/cjglTunnel/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

//获取 巷修情况 分页
export function getTunnelDetail(data) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/search',
    method: 'post',
    data
  })
}

//根据id 获取 巷修情况
export function getTunnelDetailById(id) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/get/' + id,
    method: 'get',
    id
  })
}

//保存 巷修情况
export function saveTunnelDetail(data) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/save',
    method: 'post',
    data
  })
}

//修改 巷修情况
export function editTunnelDetail(data) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/update',
    method: 'post',
    data
  })
}

//根据id 删除 巷修情况
export function deleteTunnelDetailById(id) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/delete/' + id,
    method: 'delete',
    id
  })
}

//根据id 批量删除 巷修情况
export function batchDeleteTunnelDetail(ids) {
  return request({
    url: SafeManagement + '/cjglTunnelDetail/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

// 获取巷道进度信息
export function getProcessTunnel(id) {
  return request({
    url: SafeManagement + '/cjglTunnel/getProcess?cjglTunnelId=' + id,
    method: 'post',
    id
  })
}

// 获取采掘作业规程列表 分页
export function getExcavateJobList(data) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/search',
    method: 'post',
    data
  })
}

// 保存 采掘作业规程
export function saveExcavateJob(data) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/save',
    method: 'post',
    data
  })
}

// 根据id 获取 采掘作业规程信息
export function getExcavateJobById(id) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/get/' + id,
    method: 'get',
    id
  })
}

// 更新 采掘作业规程信息
export function updateExcavateJob(data) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/update',
    method: 'post',
    data
  })
}

// 删除 采掘作业规程信息
export function deleteExcavateJob(id) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/delete/' + id,
    method: 'delete',
    id
  })
}

// 更新 采掘作业规程信息
export function batchDeleteExcavateJob(ids) {
  return request({
    url: SafeManagement + '/cjglExcavateJob/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

// 工作面生命周期管理列表 分页
export function getGzmLifeCycleList(data) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/search',
    method: 'post',
    data
  })
}

//根据id获取 工作面生命周期管理信息
export function getGzmLifeCycleById(id) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/get/' + id,
    method: 'get',
    id
  })
}

// 更新 工作面生命周期管理
export function updateGzmLifeCycle(data) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/update',
    method: 'post',
    data
  })
}

// 创建 工作面生命周期管理
export function saveGzmLifeCycle(data) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/save',
    method: 'post',
    data
  })
}

// 删除 工作面生命周期管理信息
export function deleteGzmLifeCycle(id) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量删除 工作面生命周期管理信息
export function batchDeleteGzmLifeCycle(ids) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

// 获取 工作面生命周期进度信息
export function getProcessGzmLifeCycle(id) {
  return request({
    url: SafeManagement + '/cjglGzmLifeCycle/getProcess?gzmNameId=' + id,
    method: 'post',
    id
  })
}

// 获取 巷道生命周期管理列表 分页
export function getTunnelLifeCycleList(data) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/search',
    method: 'post',
    data
  })
}

// 根据id获取 巷道生命周期管理
export function getTunnelLifeCycleById(id) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/get/' + id,
    method: 'get',
    id
  })
}


// 创建 巷道生命周期管理
export function saveTunnelLifeCycle(data) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/save',
    method: 'post',
    data
  })
}

// 更新 巷道生命周期管理
export function updateTunnelLifeCycle(data) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/update',
    method: 'post',
    data
  })
}

// 根据id 删除 巷道生命周期管理
export function deleteTunnelLifeCycle(id) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/delete/' + id,
    method: 'delete',
    id
  })
}

// 批量 删除 巷道生命周期管理
export function batchDeleteTunnelLifeCycle(ids) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/batchDelete?entityIds=' + ids,
    method: 'post',
    ids
  })
}

// 批量 删除 巷道生命周期管理
export function getProcessTunnelLifeCycle(id) {
  return request({
    url: SafeManagement + '/cjglTunnelLifeCycle/getProcess?tunnelNameId=' + id,
    method: 'post',
    id
  })
}
