const SidebarKey = 'sidebar_collapse'

export function getSidebarStatus() {
  return localStorage.getItem(SidebarKey)
}

export function setSidebarStatus(status) {
  return localStorage.setItem(SidebarKey, status)
}

export function removeSidebarStatus() {
  return localStorage.removeItem(SidebarKey)
}
