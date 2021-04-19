<template>
  <div class="menu-main">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </div>

</template>

<script>
export default {
  name: 'MenuMain', // 提供多级菜单的容器用于缓存，必须命名
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
