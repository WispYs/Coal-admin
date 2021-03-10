<template>
  <div class="headbar-logo-container">
    <transition name="headbarLogoFade">
      <router-link class="headbar-logo-link" to="/">
        <img src="@/assets/images/logo_demo.png" class="headbar-logo">
        <!-- <h1 class="headbar-title">煤炭工业合肥设计研究院</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.headbarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.headbarLogoFade-enter,
.headbarLogoFade-leave-to {
  opacity: 0;
}

</style>
