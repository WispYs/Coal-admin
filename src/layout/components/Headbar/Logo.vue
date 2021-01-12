<template>
  <div class="headbar-logo-container">
    <transition name="headbarLogoFade">
      <router-link class="headbar-logo-link" to="/">
        <img src="@/assets/images/logo_demo.png" class="headbar-logo">
        <h1 class="headbar-title">煤炭工业合肥设计研究院</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.headbarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.headbarLogoFade-enter,
.headbarLogoFade-leave-to {
  opacity: 0;
}

.headbar-logo-container {
  float: left;
  width: 200px;
  height: 60px;
  line-height: 60px;

  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .headbar-logo-link {
    height: 100%;
    width: 100%;

    & .headbar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .headbar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .headbar-logo {
      margin-right: 0px;
    }
  }
}
</style>
