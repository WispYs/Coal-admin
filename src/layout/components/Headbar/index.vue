<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" />
    <div class="menu-container">
      <menu-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import MenuItem from './MenuItem'

export default {
  components: { MenuItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes' // state 里存储的路由配置
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    }
  }
}
</script>
