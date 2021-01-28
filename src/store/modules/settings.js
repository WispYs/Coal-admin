import defaultSettings from '@/settings'

const { showSettings, fixedHeader, headbarLogo, needTagsView } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  headbarLogo: headbarLogo,
  needTagsView: needTagsView
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 禁止使用 Object.prototype 内置属性
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

