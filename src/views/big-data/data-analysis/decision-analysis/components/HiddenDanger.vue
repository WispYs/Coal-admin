<template>
  <div class="hidden-danger">
    <div class="item-title">
      <p>隐患/三违状况</p>
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
      <hidden-danger-chart :cdata="hiddenDangerData" />
    </div>
  </div>
</template>
<script>
import HiddenDangerChart from './HiddenDangerChart'
export default {
  components: { HiddenDangerChart },
  data() {
    return {
      type: '隐患',
      select: [
        { value: '隐患', label: '隐患' },
        { value: '三违', label: '三违' }
      ],
      hiddenDangerData: {
        yAxis: [1, 1, 2, 1, 3, 4, 2],
        xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        color: '#faad14'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .hidden-danger {
    height: 1.77rem;
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
