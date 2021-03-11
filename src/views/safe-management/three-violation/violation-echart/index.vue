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
        <!-- <div class="filter-item">
          <span>总数量：</span>
          <span style="color: red">{{ lineCount }}</span>
        </div> -->
      </div>
      <h3>年度三违统计趋势图</h3>
      <line-chart v-loading="loading" :cdata="lineData" />
      <div class="chart-detail line-detail">
        <div class="chart-row">
          <div class="chart-item chart-title">指标</div>
          <div v-for="(item, index) in lineData.name" :key="index" class="chart-item">{{ item }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title">数量</div>
          <div v-for="(item, index) in lineData.value" :key="index" class="chart-item">{{ item }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title tip">结论</div>
          <div class="chart-item chart-total tip">出现违章最多的月份是3月，共计218人次。</div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-container--left">
        <div class="pie-filter">
          <div class="filter-item">
            <span>检查日期范围：</span>
            <el-date-picker
              v-model="riskDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <!-- <div class="filter-item">
            <span>风险专业：</span>
            <el-select v-model="riskProfession" placeholder="请选择" @change="selectRisk">
              <el-option
                v-for="item in professionData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div> -->
        </div>
        <h3>按【严重程度】统计</h3>
        <pie-chart v-loading="loading" :cdata="pieData" />
      </div>
      <div class="chart-container--right">
        <div class="bar-filter">
          <div class="filter-item">
            <span>分析类型：</span>
            <el-radio-group v-model="riskDimension">
              <el-radio-button label="严重程度" />
              <el-radio-button label="班次" />
              <el-radio-button label="违章单位" />
            </el-radio-group>
          </div>
        </div>
        <h3>三违按【严重程度】统计</h3>
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
          <div class="chart-item chart-total tip">2020年12月全矿共查出三违{{ riskTotal }}人次，查出一般违规1261人次，占比97.90%。查出严重违规27人次，占比2.10%。重点违规0人次，占比0.00%。红线违规0人次，占比0.00%。</div>
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
      lineCount: 0,
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
      years: [
        { value: '2020', label: '2020年' },
        { value: '2019', label: '2019年' },
        { value: '2018', label: '2018年' },
        { value: '2017', label: '2017年' },
        { value: '2016', label: '2016年' }
      ],
      filterYear: '2020',
      filterTime: [],
      riskDimension: '严重程度'
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
        const bar = response.data.barData3
        const pie = response.data.barData3
        this.riskTotal = response.data.barCount3
        const lineName = []
        const lineValue = []
        const barName = []
        const barValue = []
        line.forEach(item => {
          lineName.push(item.month + '月')
          lineValue.push(item.value)
        })
        this.lineData = {
          name: lineName,
          value: lineValue
        }
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
    selectYear(val) {
      this.__fetchLineData()
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
    justify-content: center;
  }
  .bar-filter {
    display: flex;
    justify-content: center;
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
    &.line-detail{
      float: left;
      width:100%;
      .chart-item {
        width: calc((100% - 146px) / 12);
        &.chart-total {
          width: calc(100% - 124px);
        }
      }

    }
  }
}

</style>
