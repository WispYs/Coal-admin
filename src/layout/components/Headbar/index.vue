<template>
  <div class="headbar-wrapper">
    <!-- <headbar-top @showThemeDialog="showThemeDialog" /> -->
    <h1 class="headbar-title">矿井综合信息化平台</h1>
    <headbar-menu :routes="permission_routes" />
    <headbar-right @showThemeDialog="showThemeDialog" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeadbarMenu from './HeadbarMenu'
import HeadbarRight from './HeadbarRight'
export default {
  components: {
    HeadbarMenu,
    HeadbarRight
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
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.headbar-title {
  float: left;
  width: calc(#{$sidebarWidth} - 20px);
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  margin: 0;
  color: #fff;

}

</style>
