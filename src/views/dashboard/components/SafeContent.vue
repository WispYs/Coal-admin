<template>
  <div class="content safe-content">
    <div class="content-title">
      <span>安全状况</span>
      <el-select v-model="riskType" placeholder="请选择风险类型" class="title-select">
        <el-option
          v-for="item in riskList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="content-box">
      <div class="risk-tag">
        <div class="tag-item">
          <i class="red" />
          <span>高风险</span>
        </div>
        <div class="tag-item">
          <i class="yellow" />
          <span>中风险</span>
        </div>
        <div class="tag-item">
          <i class="blue" />
          <span>轻风险</span>
        </div>
        <div class="tag-item">
          <i class="green" />
          <span>良</span>
        </div>
      </div>
      <!-- <risk-chart v-for="item in riskData" :key="item.name" :cdata="item" style="display: inline-block" /> -->
      <risk-chart :cdata="riskData[0]" style="display: inline-block" />
      <risk-chart :cdata="riskData[1]" style="display: inline-block" />
      <risk-chart :cdata="riskData[2]" style="display: inline-block" />
      <risk-chart :cdata="riskData[3]" style="display: inline-block" />

    </div>
  </div>
</template>
<script>
import RiskChart from './RiskChart'
import { RiskData } from '@/data/dashboard'

export default {
  components: { RiskChart },
  data() {
    return {
      riskType: '',
      riskList: [
        { value: 1, label: '环' },
        { value: 2, label: '机' },
        { value: 3, label: '管' }
      ],
      riskData: []
    }
  },
  mounted() {
    this.riskData = RiskData
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/dashboard.scss';
.safe-content {
  .risk-tag {
    margin: 10px 30px 20px;
    display: flex;
    align-items: center;
    .tag-item {
      display: inline-block;
      margin-right: 24px;
      i {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin-right: 6px;
        &.red {
          background: $redColor;
        }
        &.yellow {
          background: $orangeColor;
        }
        &.blue {
          background: $blueColor;
        }
        &.green {
          background: $greenColor;
        }
      }
      span {
        font-size: 12px;
        color: #666;
      }
    }
  }
}

</style>
