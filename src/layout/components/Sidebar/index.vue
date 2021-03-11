<template>
  <div class="side-bar">
    <el-menu
      mode="vertical"
      :default-active="currentPath"
      :text-color="variables.lightBlackColor"
      :unique-opened="true"

      :collapse-transition="false"
    >
      <sidebar-item v-for="route in sidebar_routes" :key="route.path" :item="route" />
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar_routes'
    ]),
    currentPath() {
      return this.$route.path
    },
    variables() {
      return variables
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
.side-bar {
  position: absolute;
  top: $headBarHeight;
  left: 0;
  width: $sidebarWidth;
  height: calc(100% - #{$headBarHeight});
  background: $whiteColor;
  overflow-x: hidden;
  overflow-y: auto;
  .el-submenu {
    .el-menu-item {
      padding-right: 10px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

}

</style>
