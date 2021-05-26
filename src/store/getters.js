const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  permission_actions : state => state.permission.actions,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  theme_class: state => state.themeColor.themeColor,
  sidebar_routes: state => state.sidebar.sidebarRoutes,
  sidebar_status: state => state.sidebar.sidebarStatus,
  globalSetting: state => state.globalSetting
}
export default getters
