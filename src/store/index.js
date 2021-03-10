import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import themeColor from './modules/themeColor'
import headbar from './modules/headbar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    tagsView,
    themeColor,
    headbar
  },
  getters
})

export default store
