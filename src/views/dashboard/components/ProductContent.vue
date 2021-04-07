<template>
  <div class="content product-content">
    <div class="content-title">
      <span>当日产量情况</span>
      <el-select v-model="region" placeholder="请选择区域" class="title-select">
        <el-option
          v-for="item in regionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="content-box">
      <div class="product-info">
        <div class="info-item">
          <label>总产量</label>
          <p><b>899.99</b>万吨</p>
        </div>
        <div class="info-item">
          <label>完成率</label>
          <p><b>99</b>%</p>
        </div>
        <div class="info-item">
          <label>计划产量</label>
          <p><b>900</b>万吨</p>
        </div>

      </div>
      <product-chart :cdata="productData" />
    </div>
  </div>
</template>
<script>
import ProductChart from './ProductChart'
export default {
  components: { ProductChart },
  data() {
    return {
      region: '',
      regionList: [],
      productData: {
        name: [],
        value: []
      }

    }
  },
  mounted() {
    this.productData = {
      name: ['计划量', '实际量', '超量', '欠量'],
      value: [450, 220, 100, 130]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/dashboard.scss';
.product-content {
  height: 480px !important;
  .product-info {
    margin: 0 10px 20px;
    .info-item {
      display: inline-block;
      margin-right: 40px;
      font-size: 13px;
      color: $lightBlackColor;
      p {
        margin-top: 8px;
        b {
          font-size: 22px;
          margin-right: 4px;
        }
      }
    }
  }
}

</style>
