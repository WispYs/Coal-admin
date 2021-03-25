<template>
  <div class="app-wrapper" :class="sidebar_status ? '' : 'hidden-sidebar'">
    <div class="nav-container">
      <headbar class="headbar-container clearfix" @showThemeDialog="themeDialogVisible = true" />
    </div>
    <sidebar v-if="sidebar_routes.length > 0" />
    <div class="main-container" :class="sidebar_routes.length > 0 ? 'has-sidebar' : ''">
      <div class="tags-wrapper">
        <tags-view />
      </div>
      <app-main />
    </div>
    <theme-dialog
      :dialog-visible="themeDialogVisible"
      @switch-theme="switchTheme"
      @close-dialog="themeDialogVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Headbar, AppMain, TagsView, ThemeDialog, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Headbar,
    AppMain,
    TagsView,
    ThemeDialog,
    Sidebar
  },
  data() {
    return {
      themeDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar_routes',
      'sidebar_status'
    ])

  },
  methods: {
    switchTheme(color) {
      this.themeDialogVisible = false
      const themeClass = 'theme-' + color
      this.$store.dispatch('themeColor/switchTheme', themeClass)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: $headBarHeight;
  }

  .tags-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.3s;
  }
</style>
