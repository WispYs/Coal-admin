<template>
  <div class="app-wrapper">
    <div class="nav-container">
      <headbar class="headbar-container clearfix" />
      <avatar class="avatar-container" @showThemeDialog="themeDialogVisible = true" />
    </div>
    <div class="main-container">
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
import { Headbar, AppMain, Avatar, TagsView, ThemeDialog } from './components'

export default {
  name: 'Layout',
  components: {
    Headbar,
    AppMain,
    Avatar,
    TagsView,
    ThemeDialog
  },
  data() {
    return {
      themeDialogVisible: false
    }
  },
  computed: {
    headbar() {
      return this.$store.state.app.headbar
    }
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
    position: fixed;
    top: $headBarHeight;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
</style>
