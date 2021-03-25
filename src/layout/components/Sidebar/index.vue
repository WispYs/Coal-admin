<template>
  <div class="side-bar">
    <el-menu
      mode="vertical"
      :default-active="currentPath"
      :background-color="sidebarBg"
      text-color="#fff"
      :unique-opened="true"
      :collapse-transition="true"
      :collapse="!sidebar_status"
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
      'sidebar_routes',
      'sidebar_status',
      'theme_class'
    ]),
    currentPath() {
      return this.$route.path
    },
    variables() {
      return variables
    },
    sidebarBg() {
      const themeMap = {
        'theme-blue': variables.menuBg,
        'theme-green': variables.menuBgGreen
      }
      console.log(themeMap[this.theme_class])
      console.log(variables)
      return themeMap[this.theme_class]
    }
  }
}
</script>
<style scoped>
.side-bar {
    position: absolute;
}

</style>
<style lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
.side-bar {
  position: absolute;
  top: $headBarHeight;
  left: 0;
  width: $sidebarWidth;
  height: calc(100% - #{$headBarHeight});
  @include menuBg($menuBg);
  overflow-x: hidden;
  overflow-y: auto;
  transition: width .3s;
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
