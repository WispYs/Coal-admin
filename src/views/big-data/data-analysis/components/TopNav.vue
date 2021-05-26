<template>
  <div class="big-data__nav">
    <div
      v-for="(item, index) in navMenu"
      :key="index"
      class="nav-item"
      :class="{'active' : $route.path === item.url, 'right-nav' : index > 2}"
      @click="$router.push({path: item.url})"
    >{{ item.title }}</div>
  </div>
</template>
<script>
export default {
  props: {
    navMenu: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.big-data__nav {
  @include clearfix;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: .95rem;
  padding: .14rem 1.13rem 0;
  color: #fff;
  background: url('~@/assets/images/big-data_top.png') no-repeat;
  background-size: cover;
  .nav-item {
    cursor: pointer;
    width: 1.96rem;
    height: .5rem;
    line-height: .5rem;
    margin-right: -.1rem;
    text-align: center;
    font-size: .18rem;
    float: left;
    background: url('~@/assets/images/big-data_left.png') no-repeat;
    background-size: cover;
    &.active,&:hover {
      background: url('~@/assets/images/big-data_left_active.png') no-repeat;
      background-size: cover;
    }
    /** 最右侧按钮 - 应急指挥 */
    &:nth-of-type(4) {
      margin-right: 0;
    }
    // &.left-nav {

    // }
    &.right-nav {
      float: right;
      background: url('~@/assets/images/big-data_right.png') no-repeat;
      background-size: cover;
      &.active,&:hover {
        background: url('~@/assets/images/big-data_right_active.png') no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
