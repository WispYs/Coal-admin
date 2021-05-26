<template>
  <div class="page-container">
    <div class="chart-container">
      <el-row class="chart-condition" :gutter="40">
        <el-col :span="12">
          <div class="condition_inline">
            <span>日期范围：</span>
            <el-date-picker
              v-model="riskDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="DateChange"
            />
          </div>
          <div class="condition_inline condition_float">
            <span>风险专业：</span>
            <el-select v-model="riskProfession" placeholder="请选择" @change="selectRisk">
              <el-option v-for="item in professionData" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="condition_float">
            <span>风险分析维度：</span>
            <el-radio-group v-model="riskDimension" @change="radioChange">
              <el-radio-button :label="1">风险等级</el-radio-button>
              <el-radio-button :label="2">风险类型</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row class="chart_content" :gutter="40">
        <el-col :span="12">
          <h3>按风险等级统计</h3>
          <pie-chart v-loading="loading" :cdata="riskList" />
        </el-col>
        <el-col :span="12">
          <h3>风险按风险等级统计</h3>
          <bar-chart v-loading="loading" :cdata="barList" />
        </el-col>
      </el-row>
      <div class="report">
        <table border="1" bordercolor="#ccc" width="100%" class="report_table">
          <tr  height="26px">
            <th width="120px" class="report_content">指标</th><th class="report_content" v-for="(item, index) in riskList" :key="index">{{ item.name }}</th>
          </tr>
          <tr width="120px" height="26px">
            <th class="report_title">数量</th><th v-for="(item, index) in riskList" :key="index">{{ item.value }}</th>
          </tr>
          <tr height="26px">
            <th class="report_title">结论</th>
            <th class="risk_content" :colspan='riskList.length' v-html="riskContent"></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRiskCount
} from '@/api/dashboard'
import {
  getsysDictListById
} from '@/api/hidden-danger'
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
      riskTotal: 0,
      riskDate: ['2021-04-01', '2021-04-30'],
      professionData: [],
      startTime: '2021-04-01',
      endTime: '2021-04-30',
      riskProfession: '10030',
      riskDimension: 1,
      riskList: [],
      barList: {
        xAxisData: [],
        seriesData: []
      },
      riskContent: ''
    }
  },
  created() {
    this.__fetchSelectList()
    this.riskCount()
  },
  methods: {
    __fetchSelectList() {
      const query = {
        parentId: 10028
      }
      getsysDictListById(query.parentId).then(response => {
        const selectList = []
        for (const m in response.data) {
          selectList.push({
            label: response.data[m].dictName,
            value: response.data[m].sysDictId
          })
        }
        this.professionData = selectList
      })
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
    },
    // 改变风险专业
    selectRisk(val) {
      this.riskProfession = val
      this.riskCount()
    },
    radioChange(val) {
      this.riskDimension = val
      this.riskCount()
    },
    riskCount() {
      const query = {
        beginTime: this.startTime,
        endTime: this.endTime,
        major: this.riskProfession,
        riskType: this.riskDimension
      }
      getRiskCount(query).then(response => {
        this.riskList = []
        this.barList.xAxisData = []
        this.barList.seriesData = []
        this.riskContent = ''
        this.riskTotal = 0
        console.log(response.data)
        response.data.forEach(Ditem => {
          this.riskList.push({
            name: Ditem.title,
            value: Ditem.count
          })
          this.riskTotal = this.riskTotal + Ditem.count
        })
        this.riskContent = `全矿共辨识出风险<span style="color:red">${this.riskTotal}</span>条,`
        let proportion = 0
        if (this.riskDimension == 1) {
          for (const r of this.riskList) {
            if(this.riskTotal == 0){
              this.riskContent = `全矿共辨识出风险<span style="color:red">${this.riskTotal}</span>条`
            }else{
              proportion = (r.value / this.riskTotal *100).toFixed(2)
              this.riskContent = `${this.riskContent}${r.name}<span style="color:red">${r.value}</span>条,占比<span style="color:red">${proportion}%</span>。`
            }
            this.barList.xAxisData.push(r.name)
            this.barList.seriesData.push(r.value)
          }
        } else {
          for (const r of this.riskList) {
            if(this.riskTotal == 0){
              this.riskContent = `全矿共辨识出风险<span style="color:red">${this.riskTotal}</span>条`
            }else{
              proportion = (r.value / this.riskTotal *100).toFixed(2)
              this.riskContent =`${this.riskContent}类型为${r.name}的风险<span style="color:red">${r.value}</span>条,占比<span style="color:red;">${proportion}%</span>。`
            }
            this.barList.xAxisData.push(r.name)
            this.barList.seriesData.push(r.value)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';

  .chart-container {
    font-size: 14px;

    .chart-condition{
      .condition_inline{
        display: inline-block;
        .el-date-editor{
          width: 280px;
        }
        .el-select{
          width: 150px;
        }
      }
      .condition_float{
        float: right;
      }
    }
    .chart_content{
      margin-top: 40px;
    }
    .report{
      text-align: center;
      color: #828284;
      margin-top: 30px;
      .report_table{
        .report_title{
          font-weight: normal;
        }
        .report_content{
          font-weight: normal;
          background-color: #F5F7FA;
        }
        .risk_content{
          .red{
            color: red!important;
          }
        }
      }
    }
  }

</style>
