/**
 *
 * 验证方法
 */

// 暂时限制登录名称为'admin' 和 'editor'，便于测试动态路由权限
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 只能输入3-20个字母、数字、下划线
export function validUserPassword(str) {
  return /^(\w){3,20}$/.test(str)
}

// 判断字符串是否是https?:|mailto:|tal: 开头的，路由地址是否为第三方外部链接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

