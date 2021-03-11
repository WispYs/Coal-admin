<template>
  <div class="page-container">
    <div class="chart-container">
      <div class="chart-container--left">
        <div class="pie-filter">
          <div class="filter-item">
            <span>日期范围：</span>
            <el-date-picker
              v-model="riskDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            />
          </div>
          <div class="filter-item">
            <span>风险专业：</span>
            <el-select v-model="riskProfession" placeholder="请选择" style="width: 150px;" @change="selectRisk">
              <el-option
                v-for="item in professionData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <h3>按风险等级统计</h3>
        <pie-chart v-loading="loading" :cdata="pieData" />
      </div>
      <div class="chart-container--right">
        <div class="bar-filter">
          <div class="filter-item">
            <span>风险分析维度：</span>
            <el-radio-group v-model="riskDimension">
              <el-radio-button label="风险等级" />
              <el-radio-button label="风险类型" />
            </el-radio-group>
          </div>
        </div>
        <h3>风险按风险等级统计</h3>
        <bar-chart v-loading="loading" :cdata="barData" />
      </div>
      <div class="chart-detail bar-detail">
        <div class="chart-row">
          <div class="chart-item chart-title">指标</div>
          <div v-for="(item, index) in barData.name" :key="index" class="chart-item">{{ item }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title">数量</div>
          <div v-for="(item, index) in barData.value" :key="index" class="chart-item">{{ item }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title tip">结论</div>
          <div class="chart-item chart-total tip">全矿共辨别出风险{{ riskTotal }}条，一般风险0条，占比0.00%。轻微风险0条，占比0.00%。较大风险1条，占比4.35%。重大风险22条，占比95.56%。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLineData } from '@/api/dashboard'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      loading: true,
      barData: {
        name: [],
        value: []
      },
      riskTotal: 0,
      pieData: null,
      riskDate: [],
      professionData: [
        { value: '安检', label: '安检' },
        { value: '采煤', label: '采煤' },
        { value: '一通三防', label: '一通三防' },
        { value: '机电运输', label: '机电运输' }
      ],
      riskProfession: '',
      riskDimension: '风险等级'
    }
  },
  mounted() {
    // this.lineData = {
    //   name: [],
    //   value: []
    // }
    this.__fetchLineData()
  },
  methods: {
    __fetchLineData() {
      this.loading = true
      getLineData().then(response => {
        this.loading = false
        const bar = response.data.barData
        const pie = response.data.barData
        this.riskTotal = response.data.barCount
        const barName = []
        const barValue = []

        bar.forEach(item => {
          barName.push(item.name)
          barValue.push(item.value)
        })
        this.barData = {
          name: barName,
          value: barValue
        }
        this.pieData = pie
      })
    },

    // 改变筛选年份
    selectRisk(val) {
      this.__fetchLineData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.chart-container {
  font-size: 14px;
  margin-bottom: 50px;
  padding: 20px 0;
  overflow: hidden;
  h3 {
    margin: 15px 0;
  }
  &--left {
    margin-right: 15px;
  }
  &--left, &--right {
    float: left;
    width: calc(50% - 10px)
  }
  .pie-filter {
    display: flex;
    justify-content: space-between;
  }
  .bar-filter {
    display: flex;
    justify-content: center;
  }
  .chart-detail {
    float: left;
    width:100%;
    text-align: center;
    margin-top: 10px;
    .chart-row {
      overflow: hidden;
      .chart-item {
        float: left;
        width: calc((100% - 146px) / 4);
        height: 22px;
        line-height: 22px;
        font-size: 13px;
        color: #666666;
        text-align: center;
        border: 1px solid $borderColor;
        margin: 1px;
        &.chart-title {
          width: 120px;
        }
        &.chart-total {
          padding-left: 20px;
          text-align: left;
          width: calc(100% - 140px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &.tip {
          background: rgb(253, 245, 230);
        }
      }
    }

  }
}

</style>
