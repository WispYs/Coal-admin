/**
 *
 * 验证方法
 */

// 暂时限制登录名称为'admin' 和 'editor'，便于测试动态路由权限
export function validUsername(str) {
  const valid_map = ['admin', 'editor','李少勇']
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

// 判断字符串是否是手机号
export function isPhone(str) {
  return /^1[3,4,5,6,7,8,9]\d{9}$/.test(str)
}

// 表单验证手机号码
export const validatePhone = (rule, value, callback) => {
  const isPhone = /^1[3,4,5,6,7,8,9]\d{9}$/.test(value)
  if (!isPhone) {
    callback(new Error('手机号码格式错误'))
  } else {
    callback()
  }
}

export const validateEmail = (rule, value, callback) => {
  const isEmail = /^[a-zA-z_][a-zA-Z_0-9]*?@\w{1,}.\[a-zA-Z]{1,}/.test(value)
  if (!isEmail) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}

