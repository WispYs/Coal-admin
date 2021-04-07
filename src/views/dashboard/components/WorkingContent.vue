<template>
  <div class="content working-content">
    <div class="content-title">
      <span>工作面情况</span>
      <el-select v-model="interval" placeholder="请选择筛选间隔" class="title-select">
        <el-option
          v-for="item in intervalList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="content-box">
      <div style="height: 60px;margin: 0 10px 20px;" />
      <working-chart :cdata="workingData" />
    </div>
  </div>
</template>
<script>
import WorkingChart from './WorkingChart'
export default {
  components: { WorkingChart },
  data() {
    return {
      interval: '',
      intervalList: ['日', '月', '年'],
      workingData: {
        name: [],
        value: []
      }

    }
  },
  mounted() {
    this.workingData = {
      name: ['计划量', '实际量', '超量', '欠量'],
      value: [450, 220, 100, 130]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/dashboard.scss';
.working-content {
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
