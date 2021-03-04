<template>
  <div class="page-container">
    <div class="chart-container">
      <div class="chart-container__filter">
        <div class="filter-item">
          <span>年度：</span>
          <el-select v-model="filterYear" placeholder="请选择" @change="selectYear">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <span>总数量：</span>
          <span style="color: red">{{ lineCount }}</span>
        </div>
      </div>
      <h3>年度统计趋势</h3>
      <line-chart v-loading="loading" :cdata="lineData" />
      <div class="chart-detail">
        <div class="chart-row">
          <div class="chart-item chart-title">指标</div>
          <div v-for="(item, index) in lineData.name" :key="index" class="chart-item">{{ item }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title">数量</div>
          <div v-for="(item, index) in lineData.value" :key="index" class="chart-item">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-container--left">
        <h3>按【严重程度】统计</h3>
        <pie-chart v-loading="loading" :cdata="pieData" />
      </div>
      <div class="chart-container--right">
        <h3>按【检查类别】统计</h3>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getLineData } from '@/api/dashboard'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
export default {
  name: 'Dashboard',
  components: {
    LineChart,
    BarChart,
    PieChart
  },
  data() {
    return {
      loading: true,
      lineData: {
        name: [],
        value: []
      },
      barData: {
        name: [],
        value: []
      },
      pieData: null,
      years: [
        { value: '2020', label: '2020年' },
        { value: '2019', label: '2019年' },
        { value: '2018', label: '2018年' },
        { value: '2017', label: '2017年' },
        { value: '2016', label: '2016年' }
      ],
      filterYear: '2020',
      lineCount: 0,
      filterTime: []
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
        this.lineCount = response.data.lineCount
        const line = response.data.lineData
        const bar = response.data.barData
        const pie = response.data.barData
        const lineName = []
        const lineValue = []
        const barName = []
        const barValue = []

        line.forEach(item => {
          lineName.push(item.month + '月')
          lineValue.push(item.value)
        })
        bar.forEach(item => {
          barName.push(item.name)
          barValue.push(item.value)
        })
        this.lineData = {
          name: lineName,
          value: lineValue
        }
        this.barData = {
          name: barName,
          value: barValue
        }
        this.pieData = pie
      })
    },

    // 改变筛选年份
    selectYear(val) {
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
  padding: 20px;
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
  &__filter {
    display: flex;
    justify-content: center;
    line-height: 40px;
    padding-right: 100px;
    .filter-item {
      display: inline-block;
      &:first-of-type {
        margin-right: 100px;
      }
    }
  }
  .chart-detail {
    text-align: center;
    margin-top: 10px;
    .chart-row {
      .chart-item {
        display: inline-block;
        width: calc((100% - 146px) / 12);
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
      }
    }
    &.bar-detail{
      float: left;
      width:100%;
      .chart-item {
        width: calc((100% - 146px) / 5);
      }
    }
  }
}

</style>
