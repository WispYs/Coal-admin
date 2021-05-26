<template>
  <div class="footage-status">
    <div class="item-title">
      <p>进尺状态</p>
      <el-select v-model="time" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <div class="footage-progress">
        <div class="footage-progress__box">
          <div v-for="(item, index) in progressData" :key="index" class="footage-progress__item">
            <span>{{ item.title }}</span>
            <el-progress :stroke-width="12" :text-inside="true" :percentage="item.value" color="#009bf5" />
          </div>
        </div>
        <div class="footage-progress__tag">当前矿井生产产量进度正常，满足接替计划要求</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: '月',
      select: [
        { value: '年', label: '年' },
        { value: '月', label: '月' },
        { value: '日', label: '日' }
      ],
      progressData: [
        { title: '工作面1', value: 35 },
        { title: '工作面2', value: 44 },
        { title: '工作面3', value: 86 },
        { title: '工作面4', value: 76 },
        { title: '工作面5', value: 86 },
        { title: '工作面6', value: 94 },
        { title: '工作面7', value: 100 },
        { title: '工作面8', value: 82 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .footage-status {
    height: 2.22rem;
    .footage-progress {
      &__box {
        @include clearfix;
        margin-bottom: .15rem;
      }
      &__item {
        float: left;
        width: 50%;
        color: #fff;
        font-size: .16rem;
        line-height: .26rem;
        &:nth-of-type(2n) {
          float: right;
        }
        span {
          margin-right: .05rem;
        }
        ::v-deep {
          .el-progress {
            display: inline-block;
            width: 1.3rem;
            max-width: calc(100% - 55px);
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
      &__tag {
        @include ellipsis(100%);
        height: .32rem;
        line-height: .32rem;
        border: 1px solid #2650ad;
        text-align: center;
        color: #fff;
        font-size: .14rem;
        background: #1a396b;
      }
    }
  }

</style>
