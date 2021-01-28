<template>
  <i :class="iconClass" class="fa i-icon" aria-hidden="true" />
</template>

<script>

export default {
  name: 'Icon',
  props: {
    iconClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.i-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  // color: $iconColor;
  overflow: hidden;
}

</style>
