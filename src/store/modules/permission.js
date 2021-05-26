import { getRoutes } from '@/api/route'
import { getToken } from '@/utils/auth'
import Layout from '@/layout'
import { constantRoutes } from '@/router'
import MenuMain from '@/layout/components/MenuMain'

/**
 * 通过用户角色判断是否有权限
 * @param {array}  roles   权限分配的角色，例如: ['admin', 'editor']
 * @param {Object} route   路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
const loadView = (view) => {
  return (resolve) => require([`@/views/${view}.vue`], resolve)
}
/**
 * 通过角色权限过滤路由配置
 * @param {array} routes   asyncRoutes 动态路由
 * @param {array} roles    权限分配的角色，例如: ['admin', 'editor']
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.component === 'Layout') {
      tmp.component = Layout
    } else {
      // const showChildren = tmp.children ? tmp.children.filter(item => !item.hidden) : []
      // if (showChildren && showChildren.length !== 0) {
      //   // 如果次级菜单有子菜单，则设置该菜单component为公共组件MenuMain，用于缓存
      //   tmp.component = MenuMain
      // } else {
      //   let sub_view = tmp.component || ''
      //   sub_view = sub_view.replace(/^\/*/g, '')
      //   // ESlint 报错
      //   // tmp.component = () => import(`@/views/${sub_view}`)
      //   tmp.component = loadView(sub_view)
      // }
      let sub_view = tmp.component || ''
      sub_view = sub_view.replace(/^\/*/g, '')
      // ESlint 报错
      // tmp.component = () => import(`@/views/${sub_view}`)
      tmp.component = loadView(sub_view)
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    const token = getToken()
    return new Promise((resolve, reject) => {
      getRoutes(token).then(response => {
        const asyncRoutes = response.data

        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
