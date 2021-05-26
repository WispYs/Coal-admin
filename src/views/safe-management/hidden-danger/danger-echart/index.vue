<template>
  <div class="page-container">
    <div class="chart-container chart_main">
      <div class="chart-container__filter">
        <div class="condition">
          <span>年度：</span>
          <el-date-picker v-model="filterYear" type="year" placeholder="选择年" @change="yearChange" />
        </div>
        <div class="total_num">
          总数量：{{ yearRiskTotal }}
        </div>
      </div>
      <h3>年度隐患统计趋势图</h3>
      <line-chart v-loading="loading" :cdata="lineData" />
      <div class="report">
        <table border="1" bordercolor="#ccc" width="100%" class="report_table">
          <tr height="26px">
            <th width="120px" class="report_content">指标</th>
            <th v-for="(item, index) in lineData.name" :key="index" class="report_content">{{ item }}</th>
          </tr>
          <tr width="120px" height="26px">
            <th class="report_title">数量</th>
            <th v-for="(item, index) in lineData.value" :key="index">{{ item }}</th>
          </tr>
          <tr height="26px">
            <th class="report_title">结论</th>
            <th :colspan="lineData.value.length" v-html="riskYearContent" />
          </tr>
        </table>
      </div>
    </div>
    <div class="chart-container">
      <el-row class="chart-condition" :gutter="40">
        <el-col :span="12">
          <div class="condition_inline">
            <span>检查日期范围：</span>
            <el-date-picker v-model="riskDate" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" @change="DateChange" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="condition_float">
            <span>分析类型：</span>
            <el-radio-group v-model="riskDimension" @change="radioChange">
              <el-radio-button :label="1">隐患级别</el-radio-button>
              <el-radio-button :label="2">隐患部门</el-radio-button>
              <el-radio-button :label="3">隐患状态</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row class="chart_content" :gutter="40">
        <el-col :span="12">
          <h3>按【检查类别】统计</h3>
          <pie-chart v-loading="loading" :cdata="riskList" />
        </el-col>
        <el-col :span="12">
          <h3>按【检查类别】统计</h3>
          <bar-chart v-loading="loading" :cdata="barList" />
        </el-col>
      </el-row>
      <div class="report" style="width:100%;overflow:scroll;">
        <table border="1" bordercolor="#ccc" width="100%" class="report_table">
          <tr height="26px">
            <th width="120px" class="report_content type_title">指标</th>
            <th v-for="(item, index) in riskList" :key="index" min-width="120px" class="report_content type_report">{{ item.name }}</th>
          </tr>
          <tr width="120px" height="26px">
            <th class="report_title type_title">数量</th>
            <th v-for="(item, index) in riskList" :key="index">{{ item.value }}</th>
          </tr>
          <tr height="26px">
            <th class="report_title type_title">结论</th>
            <th :colspan="riskList.length" v-html="riskContent" />
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getHiddenRegisterYearCount,
    getsysDictListById,
    gethiddenRegisterCount
  } from '@/api/hidden-danger'
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
        barList: {
          xAxisData: [],
          seriesData: []
        },
        yearRiskTotal: 0,
        riskTotal: 0,
        riskList: [],
        riskDate: ['2021-04-01', '2021-04-30'],
        startTime: '2021-04-01',
        endTime: '2021-04-30',
        riskProfession: '',
        filterYear: '2021',
        riskDimension: 1,
        riskYearContent: '',
        riskContent: ''
      }
    },
    mounted() {
      this.__fetchLineData()
      this.riskCount()
    },
    methods: {
      yearChange(year) {
        const date = new Date(year)
        this.filterYear = date.getFullYear().toString()
        this.__fetchLineData()
      },
      __fetchLineData() {
        this.lineData.name = []
        this.lineData.value = []
        this.yearRiskTotal = 0
        let lineLsit = []
        let maxCount = {}
        let num = 1
        const query = {
          year: this.filterYear
        }
        getHiddenRegisterYearCount(query).then(response => {
          if (response.data.length > 0) {
            lineLsit = response.data
            for (let i = 0; i < lineLsit.length; i++) {
              this.lineData.name.push(lineLsit[i].month)
              this.lineData.value.push(lineLsit[i].count)
              this.yearRiskTotal += lineLsit[i].count
              if (num == 1) {
                maxCount = lineLsit[i]
                num++
              } else {
                if (lineLsit[i].count > maxCount.count) {
                  maxCount = lineLsit[i]
                }
              }
            }
            this.riskYearContent = `出现违章最多的月份是<span style="color:red">${maxCount.month}</span>,共计<span style="color:red">${maxCount.count}</span>人次`
          } else {
            this.riskYearContent = ''
          }
          this.loading = false
        })
      },
      riskCount() {
        const query = {
          beginTime: this.startTime,
          endTime: this.endTime,
          type: this.riskDimension
        }
        gethiddenRegisterCount(query).then(response => {
          this.riskList = []
          this.barList.xAxisData = []
          this.barList.seriesData = []
          this.riskContent = ''
          this.riskTotal = 0
          response.data.forEach(Ritem => {
            this.riskList.push({
              name: Ritem.month,
              value: Ritem.count
            })
            this.riskTotal = this.riskTotal + Ritem.count
          })
          this.riskContent = `全矿共查出隐患<span style="color:red">${this.riskTotal}</span>人次,`
          let proportion = 0
          if (this.riskDimension == 1) {
            for (const r of this.riskList) {
              if (this.riskTotal == 0) {
                this.riskContent = `${this.riskContent}查出${r.name}<span style="color:red">${r.value}</span>人次,占比<span style="color:red">0%</span>。`
              } else {
                proportion = (r.value / this.riskTotal * 100).toFixed(2)
                this.riskContent = `${this.riskContent}查出${r.name}<span style="color:red">${r.value}</span>人次,占比<span style="color:red">${proportion}%</span>。`
              }
              this.barList.xAxisData.push(r.name)
              this.barList.seriesData.push(r.value)
            }
          } else if (this.riskDimension == 2) {
            for (const r of this.riskList) {
              if (this.riskTotal == 0) {
                this.riskContent = `全矿共查出隐患<span style="color:red">${this.riskTotal}</span>人次`
              } else {
                proportion = (r.value / this.riskTotal * 100).toFixed(2)
                this.riskContent = `${this.riskContent}查出${r.name}<span style="color:red;">${r.value}</span>人次,占比<span style="color:red">${proportion}%</span>。`
              }
              this.barList.xAxisData.push(r.name)
              this.barList.seriesData.push(r.value)
            }
          } else if (this.riskDimension == 3) {
            for (const r of this.riskList) {
              if (this.riskTotal == 0) {
                this.riskContent = `${this.riskContent}查出${r.name}违规<span style="color:red;">${r.value}</span>人次,占比<span style="color:red;">0%</span>。`
              } else {
                proportion = (r.value / this.riskTotal * 100).toFixed(2)
                this.riskContent = `${this.riskContent}查出${r.name}违规<span style="color:red;">${r.value}</span>人次,占比<span style="color:red;">${proportion}%</span>。`
              }
              this.barList.xAxisData.push(r.name)
              this.barList.seriesData.push(r.value)
            }
          }
        })
      },
      radioChange(val) {
        this.riskDimension = val
        this.riskCount()
      },
      DateChange(date) {
        if (!date) {
          this.startTime = ''
          this.endTime = ''
        } else {
          this.startTime = this.dateConversion(date[0])
          this.endTime = this.dateConversion(date[1])
        }
        this.riskCount()
      },
      dateConversion(data) {
        var d = new Date(data)
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        return datetime
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';

  .chart_main {
    margin-bottom: 50px;
    padding: 20px 0;
    overflow: hidden;

    .chart-container__filter {
      width: 400px;
      margin: auto;

      .condition {
        display: inline-block;
      }

      .total_num {
        display: inline-block;
        margin-left: 60px;
        line-height: 40px;
        float: right;
      }
    }
  }

  .chart-container {
    font-size: 14px;

    .chart-condition {
      .condition_inline {
        display: inline-block;

        .el-date-editor {
          width: 280px;
        }

        .el-select {
          width: 150px;
        }
      }

      .condition_float {
        float: right;
      }
    }

    .chart_content {
      margin-top: 40px;
    }

    .report {
      text-align: center;
      color: #828284;
      margin-top: 30px;
      width: 100%;
      overflow: scroll;

      .report_table {
        .type_report {
          min-width: 120px;
        }

        .type_title {
          min-width: 120px;
        }

        .report_title {
          font-weight: normal;
        }

        .report_content {
          font-weight: normal;
          background-color: #F5F7FA;
        }
      }
    }
  }
</style>
