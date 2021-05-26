<template>
  <div class="run-time">
    <div class="item-title no-select">
      <p>运转时间</p>
    </div>
    <div class="item-content" />
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .run-time {
    display: inline-block;
    width: calc((50% - .1rem)/2);
    height: 2.2rem;
  }

</style>
