<template>
  <div class="progress-content">
    <div v-for="(item, index) in cdata" :key="index" class="progress-content__item">
      <span>{{ item.title }}</span>
      <el-progress :stroke-width="flexible(16)" :percentage="item.value" :class="item.className" />
    </div>
  </div>
</template>
<script>
import flexible from './mixins/flexible'
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
  },
  methods: {
    flexible(val) {
      return flexible(val)
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
      .blue {
        .el-progress-bar__inner{
          background-color: unset;
          background-image: linear-gradient(to right, #1fefff , #1fefff);
        }
      }
      .green {
        .el-progress-bar__inner{
          background-color: unset;
          background-image: linear-gradient(to right, #009af6 , #00d1a9);
        }
      }
      .purple {
        .el-progress-bar__inner{
          background-color: unset;
          background-image: linear-gradient(to right, #557ffd , #8b60ff);
        }
      }
      .orange {
        .el-progress-bar__inner{
          background-color: unset;
          background-image: linear-gradient(to right, #f1941d , #fe5f52);
        }
      }

    }
  }
}

</style>
