<template>
  <div class="product-status">
    <div class="item-title">
      <p>产量状态</p>
      <el-select v-model="workingFace" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <div class="product-info">
        <div v-for="(it,index) in productInfo" :key="index" class="product-info__item">
          <p>{{ it.label }}</p>
          <span>{{ it.value }}</span>
        </div>
      </div>
      <div class="product-chart">
        <product-bar-chart :cdata="barData" />
      </div>
      <div class="product-card">
        <div class="product-card__box">
          <div v-for="(it,index) in productCard" :key="index" class="product-card__item">
            <p>{{ it.value }}</p>
            <span>{{ it.label }}</span>
          </div>
        </div>

        <div class="product-card__tag">当前矿井生产产量进度正常，满足接替计划要求</div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductBarChart from './ProductBarChart'

export default {
  components: { ProductBarChart },
  data() {
    return {
      workingFace: '1126(1)工作面',
      select: [
        { value: '1126(1)工作面', label: '1126(1)工作面' },
        { value: '1265(2)工作面', label: '1265(2)工作面' },
        { value: '1381(1)工作面', label: '1381(1)工作面' }
      ],
      productInfo: [
        { value: '899.99', label: '总产量(万吨)' },
        { value: '90', label: '完成率(%))' },
        { value: '999.99', label: '计划产量(万吨)' }
      ],
      barData: {
        xLabel: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        yLabel: [200, 120, 150, 130, 80, 120, 65, 110, 130, 140, 180, 200],
        yAxisName: '单位/万吨'
      },
      productCard: [
        { value: '360', label: '计划(万吨)' },
        { value: '240', label: '实际(万吨)' },
        { value: '120', label: '超欠(万吨)' },
        { value: '90%', label: '当月完成情况' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .product-status {
    height: 4.23rem;
    .product-info {
      display: flex;
      justify-content: space-between;
      &__item {
        width: 1.3rem;
        border: 1px solid #1fefff;
        border-radius: 6px;
        margin-right: .14rem;
        padding: .05rem;
        p {
          font-size: .14rem;
          line-height: .2rem;
          color: #fff;
        }
        span {
          font-size: .18rem;
          color: #1fefff;
          font-weight: bold;
        }
      }
    }
    .product-chart {
      height: 1.62rem;
    }
    .product-card {
      height: 1.64rem;
      &__box {
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
      }
      &__item {
        width: .9rem;
        height: .9rem;
        background: #22305b;
        border-radius: 6px;
        text-align: center;
        padding-top: .25rem;
        p {
          font-size: .2rem;
          color: #1fefff;
          margin-bottom: .05rem;
        }
        span {
          @include ellipsis(100%);
          display: block;
          font-size: .12rem;
          color:#f9f9f9;
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
