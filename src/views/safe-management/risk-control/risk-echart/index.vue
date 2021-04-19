<template>
  <div class="page-container">
    <div class="chart-container">
      <div class="chart-container--left">
        <div class="pie-filter">
          <div class="filter-item">
            <span>日期范围：</span>
            <el-date-picker v-model="riskDate" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" style="width: 300px;" @change="DateChange" />
          </div>
          <div class="filter-item">
            <span>风险专业：</span>
            <el-select v-model="riskProfession" placeholder="请选择" style="width: 150px;" @change="selectRisk">
              <el-option v-for="item in professionData" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <h3>按风险等级统计</h3>
        <pie-chart v-loading="loading" :cdata="riskList" />
      </div>
      <div class="chart-container--right">
        <div class="bar-filter">
          <div class="filter-item">
            <span>风险分析维度：</span>
            <el-radio-group v-model="riskDimension" @change="radioChange">
              <el-radio-button :label="1">风险等级</el-radio-button>
              <el-radio-button :label="2">风险类型</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <h3>风险按风险等级统计</h3>
        <bar-chart v-loading="loading" :cdata="barList" />
      </div>
      <div class="chart-detail bar-detail">
        <div class="chart-row">
          <div class="chart-item chart-title">指标</div>
          <div v-for="(item, index) in riskList" :key="index" class="chart-item">{{ item.name }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title">数量</div>
          <div v-for="(item, index) in riskList" :key="index" class="chart-item">{{ item.value }}</div>
        </div>
        <div class="chart-row">
          <div class="chart-item chart-title tip">结论</div>
          <div class="chart-item chart-total tip">{{riskContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLineData,
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
    },
    methods: {
      __fetchSelectList() {
        let parentId = ''
        if (this.riskDimension == 1) {
          parentId = Number(17)
        } else {
          parentId = Number(18)
        }
        const query = [{
          parentId: 10028
        }, {
          parentId: parentId
        }, ]
        for (let q in query) {
          getsysDictListById(query[q].parentId).then(response => {
            console.log(response.data);
            if (query[q].parentId == 10028) {
              let selectList = response.data
              for (let m in response.data) {
                this.getIterationData(selectList[m], response.data[m])
              }
              this.professionData = selectList
            } else if (query[q].parentId == parentId) {
              this.riskList = []
              response.data.forEach(item => {
                this.riskList.push({
                  name: item.dictName,
                  value: 0
                })
              })
              this.riskCount()
              console.log(this.riskList);
            }
          })
        }
      },
      getIterationData(_m, _d) {
        _m.label = _d.dictName
        _m.value = _d.sysDictId
        _m.children = _d.sysDictList
        if (_d.sysDictList.length > 0) {
          for (let m in _d.sysDictList) {
            this.getIterationData(_m.children[m], _d.sysDictList[m])
          }
        }
      },
      DateChange(date) {
        console.log(date);
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
        var d = new Date(data);
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return datetime
      },
      // 改变风险专业
      selectRisk(val) {
        this.riskProfession = val
        this.riskCount()
      },
      radioChange(val) {
        this.riskDimension = val
        this.__fetchSelectList()
      },
      riskCount() {
        const query = {
          beginTime: this.startTime,
          endTime: this.endTime,
          major: this.riskProfession,
          riskType: this.riskDimension
        }
        getRiskCount(query).then(response => {
          console.log(response.data);
          this.barList.xAxisData = []
          this.barList.seriesData = []
          this.riskContent =''
          this.riskTotal = 0
          if (response.data.length > 0) {
            response.data.forEach(Ditem => {
              if (Ditem) {
                this.riskList.forEach(Ritem => {
                  if (Ditem.title == Ritem.name) {
                    Ritem.value = Ditem.count
                    this.riskTotal = this.riskTotal + Ditem.count
                  }
                })
              }
            })
            this.riskContent = '全矿共辨识出风险' + this.riskTotal + '条,'
            if(this.riskDimension == 1){
              for (let r of this.riskList) {
                this.riskContent = this.riskContent + r.name + r.value + '条,占比' + r.value/this.riskTotal*100 + '%。'
                this.barList.xAxisData.push(r.name)
                this.barList.seriesData.push(r.value)
              }
            }else{
              for (let r of this.riskList) {
                this.riskContent = this.riskContent + '类型为' + r.name + '的风险' + r.value + '条,占比' + r.value/this.riskTotal*100 + '%。'
                this.barList.xAxisData.push(r.name)
                this.barList.seriesData.push(r.value)
              }
            }

          } else {
            this.riskList.forEach(Ritem => {
              Ritem.value = 0
              this.barList.seriesData.push(0)
            })
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
    margin-bottom: 50px;
    padding: 20px 0;
    overflow: hidden;

    h3 {
      margin: 15px 0;
    }

    &--left {
      margin-right: 15px;
    }

    &--left,
    &--right {
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
      width: 100%;
      text-align: center;
      margin-top: 10px;

      .chart-row {
        overflow: hidden;

        .chart-item {
          float: left;
          width: calc((100% - 146px) / 5);
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
