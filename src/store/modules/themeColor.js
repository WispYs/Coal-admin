import { getThemeColor, setThemeColor, removeThemeColor } from '@/utils/theme-color'

const state = {
  themeColor: 'theme-blue'
}

const mutations = {
  SET_ThemeColor: (state, cls) => {
    state.themeColor = cls
  }
}
const actions = {
  initThemeColor({ commit }) {
    const themeColor = getThemeColor() || 'theme-blue'
    window.document.documentElement.setAttribute('data-theme', themeColor)
    commit('SET_ThemeColor', themeColor)
    setThemeColor(themeColor)
  },
  switchTheme({ commit }, color) {
    return new Promise(resolve => {
      window.document.documentElement.setAttribute('data-theme', color)
      commit('SET_ThemeColor', color)
      setThemeColor(color)
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
