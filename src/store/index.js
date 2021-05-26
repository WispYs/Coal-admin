import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import buttonPermission from './modules/buttonPermission.js'
import tagsView from './modules/tagsView'
import themeColor from './modules/themeColor'
import sidebar from './modules/sidebar'
import globalSetting from './modules/globalSetting'
import mecha from './modules/mechatronics'
import upload from './modules/upload'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    buttonPermission,
    tagsView,
    themeColor,
    sidebar,
    globalSetting,
    mecha,
    upload
  },
  getters
})

export default store
