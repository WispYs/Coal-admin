<template>
  <div class="dashboard-container">
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
    </div>
    <div class="chart-container">
      <div class="chart-container__filter">
        <div class="filter-item">
          <span>检查时间范围：</span>
          <el-date-picker
            v-model="filterTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <h3>按【检查类别】统计</h3>
      <bar-chart v-loading="loading" :cdata="barData" />
    </div>
  </div>
</template>

<script>
import { getLineData } from '@/api/dashboard'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
export default {
  name: 'Dashboard',
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      loading: true,
      lineData: null,
      barData: null,
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
.dashboard {
  &-container {
    font-size: 14px;
    margin: 30px;
    .chart-container {
      margin-bottom: 30px;
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
    }
  }

}
</style>
