<template>
  <div class="headbar-wrapper">
    <headbar-top @showThemeDialog="showThemeDialog" />
    <headbar-menu :routes="permission_routes" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeadbarTop from './HeadbarTop'
import HeadbarMenu from './HeadbarMenu'
export default {
  components: {
    HeadbarTop,
    HeadbarMenu
  },
  computed: {
    ...mapGetters([
      'permission_routes' // state 里存储的路由配置
    ])
  },
  methods: {
    showThemeDialog() {
      this.$emit('showThemeDialog')
    }
  }
}
</script>
