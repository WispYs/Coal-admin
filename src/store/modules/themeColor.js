import { getThemeColor, setThemeColor, removeThemeColor } from '@/utils/theme-color'

const state = {
  themeColor: 'theme-green'
}

const mutations = {
  SET_THEMECOLOR: (state, cls) => {
    state.themeColor = cls
  }
}
const actions = {
  initThemeColor({ commit }) {
    const themeColor = getThemeColor() || 'theme-green'
    window.document.documentElement.setAttribute('data-theme', themeColor)
    commit('SET_THEMECOLOR', themeColor)
    setThemeColor(themeColor)
  },
  switchTheme({ commit }, color) {
    return new Promise(resolve => {
      window.document.documentElement.setAttribute('data-theme', color)
      commit('SET_THEMECOLOR', color)
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
