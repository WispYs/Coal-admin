const ThemeColorKey = 'theme_color'

export function getThemeColor() {
  return localStorage.getItem(ThemeColorKey)
}

export function setThemeColor(color) {
  return localStorage.setItem(ThemeColorKey, color)
}

export function removeThemeColor() {
  return localStorage.removeItem(ThemeColorKey)
}
