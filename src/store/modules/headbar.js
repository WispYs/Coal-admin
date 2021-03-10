import store from '@/store'

const state = {
  sidebarRoutes: []
}

const mutations = {
  SET_SIDEBAR_ROUTES: (state, routes) => {
    state.sidebarRoutes = routes
  }
}

const actions = {
  initSidebarRoutes({ commit }, path) {
    return new Promise(resolve => {
      // 筛选出在 headerbar 中显示的菜单
      const permissionRoutes = store.getters.permission_routes.filter(item => !item.hidden)
      // 根据路由路径筛选出当前路由所属的一级路由菜单
      const currentRoutes = permissionRoutes.filter(item => path.includes(item.path))[0]
      // 侧边栏路由列表即为currentRoutes的children
      const sidebarRoutes = currentRoutes && currentRoutes.children ? currentRoutes.children : []
      commit('SET_SIDEBAR_ROUTES', sidebarRoutes)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
