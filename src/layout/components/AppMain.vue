<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  mounted() {
    console.log(this.cachedViews)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.app-main {
  width: 100%;
  height: 100%;
  position: relative;
  background: $pageBg;
}

</style>

<style lang="scss">

</style>
