import request from '@/utils/request'
import { BaseUrl, SystemUrl, InformationUrl, SysRulleUrl } from './url'

// 应用管理系统
export function getApplicationList(data) {
  return request({
    url: `${SystemUrl}/sysManage/search`,
    method: 'post',
    data
  })
}

export function createApplication(data) {
  return request({
    url: `${SystemUrl}/sysManage/save`,
    method: 'post',
    data
  })
}
export function getApplicationInfo(id) {
  return request({
    url: `${SystemUrl}/sysManage/get/${id}`,
    method: 'get'
  })
}
export function editApplication(data) {
  return request({
    url: `${SystemUrl}/sysManage/update`,
    method: 'post',
    data
  })
}

// 删除应用系统
export function delApplication(id) {
  return request({
    url: `${SystemUrl}/sysManage/delete/${id}`,
    method: 'delete'
  })
}

// 批量删除应用系统列表
export function batchDeleteManage(data) {
  return request({
    url: `${SystemUrl}/sysManage/delete?ids=` + data,
    method: 'delete',
    data
  })
}

// 用户管理
export function getUserList(data) {
  return request({
    url: `${SystemUrl}/sysUser/search`,
    method: 'post',
    data
  })
}

// 获取全部用户列表,并包含用户所属部门
export function getAllUserList(data) {
  return request({
    url: `${SystemUrl}/sysUser/loadAllTreeUser`,
    method: 'post',
    data
  })
}

// 获取全部用户列表,不包含用户所属部门
export function selectUserList(data) {
  return request({
    url: `${SystemUrl}/sysUser/baseSelectCombox`,
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/save`,
    method: 'post',
    data
  })
}
export function getUserInfo(id) {
  return request({
    url: `${SystemUrl}/sysUser/get/${id}`,
    method: 'get'
  })
}
export function editUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/update`,
    method: 'post',
    data
  })
}

// 根据id 删除用户
export function delUser(id) {
  return request({
    url: `${SystemUrl}/sysUser/delete/${id}`,
    method: 'delete'
  })
}

// 根据id 批量删除用户
export function batchDeleteUser(data) {
  return request({
    url: `${SystemUrl}/sysUser/delete?ids=${data}`,
    method: 'delete',
    data
  })
}

export function resetUserPassword(sysUserId) {
  return request({
    url: `${SystemUrl}/sysUser/resetPwd`,
    method: 'delete',
    params: { sysUserId }
  })
}

// 组织机构管理
export function getOrganList(data) {
  return request({
    url: `${SystemUrl}/sysDept/search`,
    method: 'post',
    data
  })
}
export function createOrgan(data) {
  return request({
    url: `${SystemUrl}/sysDept/save`,
    method: 'post',
    data
  })
}
export function getOrganInfo(id) {
  return request({
    url: `${SystemUrl}/sysDept/get/${id}`,
    method: 'get'
  })
}
export function editOrgan(data) {
  return request({
    url: `${SystemUrl}/sysDept/update`,
    method: 'post',
    data
  })
}
export function delOrgan(id) {
  return request({
    url: `${SystemUrl}/sysDept/delete/${id}`,
    method: 'delete'
  })
}
// 获取用户所在部门及以下所有子部门
export function getOrganTree(sysDeptId) {
  return request({
    url: `${SystemUrl}/sysDept/getSysDeptTree`,
    method: 'post',
    params: { sysDeptId }
  })
}
// 获取指定部门及以下所有子部门
export function getOrganChildTree(parentId) {
  return request({
    url: `${SystemUrl}/sysDept/findParentId`,
    method: 'post',
    params: { parentId }
  })
}

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: SystemUrl + '/sysRole/search',
    method: 'post',
    data
  })
}

// 获取角色类型列表
export function getRoleTypeList(data) {
  return request({
    url: SystemUrl + '/sysRoleType/search',
    method: 'post',
    data
  })
}

// 创建角色类型
export function saveRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/save',
    method: 'post',
    data
  })
}

// 删除角色类型
export function deleteRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/delete/' + data,
    method: 'delete',
    data
  })
}

// 批量删除角色类型
export function batchDeleteRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/batchDelete?entityIds=' + data,
    method: 'post',
    data
  })
}

// 修改角色类型
export function updateRoleType(data) {
  return request({
    url: SystemUrl + '/sysRoleType/update',
    method: 'post',
    data
  })
}

// 获取站点列表
export function getSiteList(data) {
  return request({
    url: SystemUrl + '/sysManage/search',
    method: 'post',
    data
  })
}

// 创建角色
export function saveRole(data) {
  return request({
    url: SystemUrl + '/sysRole/save',
    method: 'post',
    data
  })
}

// 获取角色下的用户列表
export function getRoleUserList(data) {
  return request({
    url: SystemUrl + '/sysUser/search',
    method: 'post',
    data
  })
}

// 添加角色用户
export function addRoleUser(data) {
  return request({
    url: SystemUrl + '/sysRole/saveRoleUser' + '?sysRoleId=' + data.sysRoleId + '&sysUserIds=' + data.sysUserIds,
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: SystemUrl + '/sysRole/delete/' + data,
    method: 'delete',
    data
  })
}

// 批量删除角色
export function batchDeleteRole(data) {
  return request({
    url: SystemUrl + '/sysRole/delete?ids=' + data,
    method: 'delete',
    data
  })
}

// 移除角色用户
export function deleteRoleUser(data) {
  return request({
    url: SystemUrl + '/sysRole/deleteUsers?sysRoleId=' + data.sysRoleId + '&sysUserIds=' + data.sysUserIds,
    method: 'post',
    data
  })
}

// 获取全部角色列表
export function getSelectRoleList(data) {
  return request({
    url: SystemUrl + '/sysRole/baseSelectCombox',
    method: 'post',
    data
  })
}

// 根据id 获取 角色信息
export function getRoleTypeById(id) {
  return request({
    url: SystemUrl + '/sysRoleType/get/' + id,
    method: 'get',
    id
  })
}

// 更新对象信息
export function updateRole(data) {
  return request({
    url: SystemUrl + '/sysRole/update',
    method: 'post',
    data
  })
}

// 角色类型获取站点列表
export function selectCombox(data) {
  return request({
    url: SystemUrl + '/sysManage/selectCombox',
    method: 'get',
    data
  })
}

// 角色管理获取角色类型列表
export function RoleTypeSelectBox(data) {
  return request({
    url: SystemUrl + '/sysRoleType/selectCombox',
    method: 'get',
    data
  })
}

// 角色管理获取模块授权列表
export function getMenuOrButtonList(data) {
  return request({
    url: SystemUrl + '/sysMenu/findMenuTree?parentId=' + data.parentId + '&roleId=' + data.roleId,
    method: 'post',
    data
  })
}

// 菜单管理获取菜单列表
export function getMenuOrButtonMenuList(data) {
  return request({
    url: SystemUrl + '/sysMenu/findMenuTree?parentId=' + data.parentId + '&type=' + data.type,
    method: 'post',
    data
  })
}

// 角色管理获取模块授权列表
export function getRoleById(id) {
  return request({
    url: SystemUrl + '/sysRole/get/' + id,
    method: 'get',
    id
  })
}

// 角色管理模块授权
export function roleEmpower(data) {
  return request({
    url: SystemUrl + '/sysRole/saveRoleMenu' + '?sysRoleId=' + data.sysRoleId + '&sysMenuIds=' + data.sysMenuIds,
    method: 'post',
    data
  })
}

// 获取菜单列表
export function getMenuList(data) {
  return request({
    url: SystemUrl + '/sysMenu/search',
    method: 'post',
    data
  })
}

// 保存菜单
export function saveMenu(data) {
  return request({
    url: SystemUrl + '/sysMenu/save',
    method: 'post',
    data
  })
}

// 根据菜单id获取按钮列表
export function findMenuBtnListById(id) {
  return request({
    url: SystemUrl + '/sysMenu/findMenuByIdBtnList?menuId=' + id,
    method: 'get',
    id
  })
}

// 根据菜单id删除按钮列表
export function deleteMenuById(id) {
  return request({
    url: SystemUrl + '/sysMenu/delete/' + id,
    method: 'delete',
    id
  })
}

// 根据id获取菜单信息
export function getMenuById(id) {
  return request({
    url: SystemUrl + '/sysMenu/get/' + id,
    method: 'get',
    id
  })
}

// 保存菜单
export function updateMenu(data) {
  return request({
    url: SystemUrl + '/sysMenu/update',
    method: 'post',
    data
  })
}

// // 根据id删除菜单
// export function deleteMenuById(id) {
//   return request({
//     url: SystemUrl + '/sysMenu/search?entityId=' + id,
//     method: 'post',
//     id
//   })
// }

// 查询数据字典
export function getDictionaryList(data) {
  return request({
    url: SystemUrl + '/sysDict/search',
    method: 'post',
    data
  })
}

// 查询全部数据字典
export function getSelectSysDict(data) {
  return request({
    url: SystemUrl + '/sysDict/findDictTree',
    method: 'post',
    data
  })
}

// 创建数据字典
export function saveSysDict(data) {
  return request({
    url: SystemUrl + '/sysDict/saveSysDict',
    method: 'post',
    data
  })
}

// 更新数据字典
export function updateSysDict(data) {
  return request({
    url: SystemUrl + '/sysDict/updateSysDict',
    method: 'post',
    data
  })
}

// 根据id获取子数据字典
export function getDataDictionaryChildTree(id) {
  return request({
    url: SystemUrl + '/sysDict/findParentId?parentId=' + id,
    method: 'post',
    id
  })
}

// 根据id获取字典信息
export function getDictById(id) {
  return request({
    url: SystemUrl + '/sysDict/get/' + id,
    method: 'get',
    id
  })
}

// 删除数据字典
export function deleteDict(id) {
  return request({
    url: SystemUrl + '/sysDict/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取登录日志
export function getLoginLogList(data) {
  return request({
    url: SystemUrl + '/sysLog/search',
    method: 'post',
    data
  })
}

// 获取消息模板
export function selectTemplateList(data) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/baseSelectCombox',
    method: 'post',
    data
  })
}

// 根据父节点获取消息模板列表
export function getTtypelistByParentId(id) {
  return request({
    url: InformationUrl + '/sysMsgType/listByParentId?parentId=' + id,
    method: 'post',
    id
  })
}

// 根据id获取消息模板
export function getMsgTypeById(id) {
  return request({
    url: InformationUrl + '/sysMsgType/get/' + id,
    method: 'get',
    id
  })
}

// 获取消息类型
export function getNewsTypeList(data) {
  return request({
    url: InformationUrl + '/sysMsgType/search',
    method: 'post',
    data
  })
}

// 获取 消息类型树
export function getChildrenMsgList(data) {
  return request({
    url: InformationUrl + '/sysMsgType/findMsgTypeTree',
    method: 'post',
    data
  })
}

// 创建消息类型
export function saveNewsType(data) {
  return request({
    url: InformationUrl + '/sysMsgType/save',
    method: 'post',
    data
  })
}

// 修改消息类型
export function updateNewsType(data) {
  return request({
    url: InformationUrl + '/sysMsgType/update',
    method: 'post',
    data
  })
}

// 删除消息类型
export function deleteNewsType(id) {
  return request({
    url: InformationUrl + '/sysMsgType/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取消息列表
export function getMsgRecord(data) {
  return request({
    url: InformationUrl + '/sysMsgRecord/search',
    method: 'post',
    data
  })
}

// 获取消息模板列表
export function getMsgTemplateList(data) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/search',
    method: 'post',
    data
  })
}

// 保存消息模板
export function saveMsgTemplate(data) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/save',
    method: 'post',
    data
  })
}

// 根据id获取消息模板
export function getMsgTemplate(id) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/get/' + id,
    method: 'get',
    id
  })
}

// 更新消息模板
export function updateMsgTemplate(data) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/update',
    method: 'post',
    data
  })
}

// 删除消息模板
export function delMsgTemplate(id) {
  return request({
    url: InformationUrl + '/sysMsgTemplate/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取 预警告信息模板  分页
export function getFormwork(data) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/search',
    method: 'post',
    data
  })
}

// 保存 预警告信息模板
export function saveFormwork(data) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/save',
    method: 'post',
    data
  })
}

// 根据id 获取 预警告信息模板
export function getFormworkById(id) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/get/' + id,
    method: 'get',
    id
  })
}

// 更新 预警告信息模板
export function updateFormwork(data) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/update',
    method: 'post',
    data
  })
}

// 根据id 删除 预警告信息模板
export function delFormworkById(id) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取 所有预告警模板
export function selectFormwork(data) {
  return request({
    url: SysRulleUrl + '/gzyqFormwork/baseSelectCombox',
    method: 'post',
    data
  })
}

// 获取 所有指标管理列表 分页
export function getGzyqManger(data) {
  return request({
    url: SysRulleUrl + '/gzyqManger/search',
    method: 'post',
    data
  })
}

// 保存 指标管理项
export function saveGzyqManger(data) {
  return request({
    url: SysRulleUrl + '/gzyqManger/save',
    method: 'post',
    data
  })
}

// 根据id 获取 指标管理项
export function getGzyqMangerById(id) {
  return request({
    url: SysRulleUrl + '/gzyqManger/get/' + id,
    method: 'get',
    id
  })
}

// 更新 指标管理项
export function updateGzyqManger(data) {
  return request({
    url: SysRulleUrl + '/gzyqManger/update',
    method: 'post',
    data
  })
}

// 根据id 删除 指标管理项
export function delGyqMangerById(id) {
  return request({
    url: SysRulleUrl + '/gzyqManger/delete/' + id,
    method: 'delete',
    id
  })
}

// 获取所有指标数据
export function selectMangerLsit(data) {
  return request({
    url: SysRulleUrl + '/gzyqManger/baseSelectCombox',
    method: 'post',
    data
  })
}

// 获取 预告警规则管理
export function getDefinition(data) {
  return request({
    url: SysRulleUrl + '/gzyqDefinition/search',
    method: 'post',
    data
  })
}

// 获取 预告警规则管理
export function saveDefinition(data) {
  return request({
    url: SysRulleUrl + '/gzyqDefinition/save',
    method: 'post',
    data
  })
}

// 根据id删除 预告警规则
export function delDefinitionById(id) {
  return request({
    url: SysRulleUrl + '/gzyqDefinition/delete/' + id,
    method: 'delete',
    id
  })
}

// 根据id获取 预告警规则
export function getDefinitionById(id) {
  return request({
    url: SysRulleUrl + '/gzyqDefinition/get/' + id,
    method: 'get',
    id
  })
}

// 更新 预警告规则
export function updateDefinition(data) {
  return request({
    url: SysRulleUrl + '/gzyqDefinition/update',
    method: 'post',
    data
  })
}
