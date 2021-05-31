<template>
  <div class="progress-content">
    <div v-for="(item, index) in cdata" :key="index" class="progress-content__item">
      <span>{{ item.title }}</span>
      <el-progress :stroke-width="20" :percentage="item.value" :color="item.color" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cdata: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  }

}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.progress-content {
  padding: .15rem;
  &__item {
    color: #fff;
    font-size: .16rem;
    line-height: .5rem;
    padding: 0 .3rem;
    padding-right: 0;
    span {
      margin-right: .15rem;
    }
    ::v-deep {
      .el-progress {
        display: inline-block;
        width: calc(100% - .9rem);
        .el-progress-bar__outer {
          background-color: #22305b;
        }
        .el-progress__text {
          color: #fff;
          font-size: .16rem!important;
        }
      }
    }
  }
}

</style>
