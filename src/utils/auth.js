import Cookies from 'js-cookie'

const TokenKey = 'user_token'

// Google Chrome 浏览器不允许本地 html 文件存储cookie
// 导致打包后本地打开html文件 js-cookie 失效
// 为了使打包项目正常预览，暂时用 localStorage 替代 cookie

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey)
}
