<template>
  <div class="swiper-content">
    <el-carousel indicator-position="outside" arrow="never" :autoplay="false">
      <el-carousel-item>
        <product-line-chart :cdata="productData" />
      </el-carousel-item>
      <el-carousel-item>
        <product-chart :cdata="productData" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import ProductChart from './ProductChart'
import ProductLineChart from './ProductLineChart'

export default {
  components: { ProductChart, ProductLineChart },
  data() {
    return {
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
@import '~@/assets/styles/theme.scss';

.board-nav {
  padding:10px 20px;
  overflow: hidden;
  &__item {
    float: left;
    width: calc((100% - 45px)/4);
    margin-right: 15px;
    text-align: center;
    margin-bottom: 10px;
    .item-icon {
      width: 100%;
      height: 60px;
      background: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: $blueColor;
    }
    .item-tit {
      display: block;
      font-size: 13px;
    }

  }
  &__item:nth-of-type(4n) {
    margin-right: 0;

  }
}

</style>
