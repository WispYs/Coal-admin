import Cookies from 'js-cookie'

const state = {
  headbar: {
    opened: Cookies.get('headbarStatus') ? !!+Cookies.get('headbarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.headbar.opened = !state.headbar.opened
    state.headbar.withoutAnimation = false
    if (state.headbar.opened) {
      Cookies.set('headbarStatus', 1)
    } else {
      Cookies.set('headbarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('headbarStatus', 0)
    state.headbar.opened = false
    state.headbar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
