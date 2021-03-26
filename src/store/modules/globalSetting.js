const state = () => {
  return {
    topMax: window.localStorage['topMax'] || 5
  }
}

const mutations = {
  SET_TOP_MAX: (state, topMax) => {
    state.topMax = topMax
  }
}

const actions = {
  setTopMax({ commit }, topMax) {
    commit('SET_TOP_MAX', topMax)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
