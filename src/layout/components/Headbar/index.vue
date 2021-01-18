<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" />
    <div class="menu-wrapper">
      <menu-wrap :routes="permission_routes" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import MenuWrap from './MenuWrap'

export default {
  components: { MenuWrap, Logo },
  computed: {
    ...mapGetters([
      'permission_routes' // state 里存储的路由配置
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    showLogo() {
      return this.$store.state.settings.headbarLogo
    }
  }
}
</script>
