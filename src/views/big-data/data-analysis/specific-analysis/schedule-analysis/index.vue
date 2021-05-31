<template>
  <div class="safety-wrapper">
    <div class="safety-item">
      <div class="safety-item__title">
        <p>《2021年5月17日调度掘进进尺情况》</p>
      </div>
      <div class="safety-item__content" style="position: relative;">
        <div style="position: absolute;left: 50%; top:50%; margin-left: -0.9rem;margin-top: -0.8rem;text-align: center;color:#b9babd;">
          <img src="~@/assets/images/big_data_advance.png" >
          <p style="margin-top: 0.2rem">今日暂未上报内容</p>
        </div>
      </div>
    </div>
    <div class="safety-item">
      <div class="safety-item__title">
        <p>《2021年5月17日调度掘进进尺情况》</p>
      </div>
      <div class="safety-item__content">
        <div style="width: calc(100% - 0.25rem);margin: 0.2rem auto 0;color:#b9babd">
          <h3 style="margin-bottom: 0.16rem;color: #fff;">《2021年5月17日调度掘进进尺情况》</h3>
          <p>腾讯游戏营收比重连续两个季度下降,支付、云计算等业务营收,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务收涨,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务收涨,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务营收,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务收涨,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务收涨,腾讯游戏营收比重连续两个季度下降,支付、云计算等业务营收,腾讯游戏营收比重连续两个季度下降</p>
          <img src="~@/assets/images/big_data_production .png" style="width: 8.8rem;height: 4rem;display: block;margin: 0.16rem auto;">
          <p>日计划产量31878吨,实际完成交量0吨,亏31878吨</p>
        </div>
        <!-- <component :is="item.component" :cdata="item.data" /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      safetyList1: [
        {
          title: '2021年5月17日调度掘进进尺情况',
          data: {},
        },
        {
          title: '2021年5月17日调度掘进进尺情况',
          data: {},
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.safety-wrapper {
  display: flex;
  @include clearfix;
  .safety-item {
    flex: 1;
    width: 9.2rem;
    height: 9.2rem;
    margin-right: .2rem;
    background: url('~@/assets/images/big_data_dispatch.png') no-repeat;
    background-size: cover;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    &__title {
      @include ellipsis(100%);
      height: .48rem;
      line-height: .48rem;
      padding: 0 .15rem;
      font-size: .2rem;
      color: #62eaff;
    }
    &__content {
      color: #414e6f;
      height: calc(100% - .48rem);
    }
  }
}

</style>
