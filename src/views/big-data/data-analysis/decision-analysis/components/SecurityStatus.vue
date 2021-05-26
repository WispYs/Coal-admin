<template>
  <div class="security-status">
    <div class="item-title">
      <p>安全状况</p>
      <el-select v-model="type" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <security-chart :cdata="securityData" />
    </div>
  </div>
</template>
<script>
import SecurityChart from './SecurityChart'
export default {
  components: { SecurityChart },
  data() {
    return {
      type: '风险',
      select: [
        { value: '风险', label: '风险' }
      ],
      securityData: [
        { value: 35, name: '轻微风险', itemStyle: { color: '#9456fb' }},
        { value: 25, name: '一般风险', itemStyle: { color: '#2db8ff' }},
        { value: 25, name: '较大风险', itemStyle: { color: '#16dfcb' }},
        { value: 15, name: '重大风险', itemStyle: { color: '#faad14' }}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .security-status {
    height: 2rem;
    .safety-card {
      display: flex;
      justify-content: space-between;
      &__item {
        // width: 1.26rem;
        width: 1.3rem;
        height: .66rem;
        background: url('~@/assets/images/big-data_decition_safety.png') no-repeat bottom center;
        background-size: contain;
        text-align: center;
        padding-top: .1rem;
        p {
          font-size: .22rem;
          line-height: .3rem;
          color: #1fefff;
        }
        span {
          @include ellipsis(100%);
          display: block;
          font-size: .12rem;
          color: #fff;
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
