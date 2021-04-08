import request from '@/utils/request'
import { SystemUrl } from './url'

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
export function delApplication(id) {
  return request({
    url: `${SystemUrl}/sysManage/delete/${id}`,
    method: 'delete'
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
export function delUser(id) {
  return request({
    url: `${SystemUrl}/sysUser/delete/${id}`,
    method: 'delete'
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

// 删除角色用户
export function deleteRoleUser(data) {
  return request({
    url: SystemUrl + '/sysRole/deleteUsers' + '?sysRoleId=' + data.sysRoleId + '&sysUserIds=' + data.sysUserIds,
    method: 'post',
    data
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
    url: SystemUrl + '/sysMenu/findMenuTree',
    method: 'post',
    data
  })
}

// 角色管理模块授权
export function roleEmpower(data) {
  return request({
    url: SystemUrl + '/sysRole/saveRoleMenu'+ '?sysRoleId=' + data.sysRoleId + '&sysMenuIds=' + data.sysMenuIds + '&type=' + data.type,
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

// 根据id删除菜单
export function deleteMenuById(id) {
  return request({
    url: SystemUrl + '/sysMenu/search?entityId=' + id,
    method: 'post',
    id
  })
}

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
    url: SystemUrl + '/sysDict/selectCombox',
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

// 删除数据字典
export function deleteDict(id) {
  return request({
    url: SystemUrl + '/sysDict/delete?entityId=' + id,
    method: 'post',
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
