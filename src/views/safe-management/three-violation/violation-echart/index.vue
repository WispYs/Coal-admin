<template>
  <div class="page-container">
    <div class="chart-container">
      <div class="chart-container__filter">
        <div class="filter-item">
          <span>年度：</span>
          <el-date-picker
            v-model="filterYear"
            @change="yearChange"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
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
          <div class="chart-item chart-total tip">{{riskYearContent}}</div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-container--left">
        <div class="pie-filter">
          <div class="filter-item">
            <span>检查日期范围：</span>
            <el-date-picker v-model="riskDate" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" @change="DateChange"/>
          </div>
        </div>
        <h3>按【严重程度】统计</h3>
        <pie-chart v-loading="loading" :cdata="riskList" />
      </div>
      <div class="chart-container--right">
        <div class="bar-filter">
          <div class="filter-item">
            <span>分析类型：</span>
            <el-radio-group v-model="riskDimension" @change="radioChange">
              <el-radio-button :label="1">严重程度</el-radio-button>
              <el-radio-button :label="2">班次</el-radio-button>
              <el-radio-button :label="3">违章单位</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <h3>三违按【严重程度】统计</h3>
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
  // import {
  //   getLineData
  // } from '@/api/dashboard'
  import { getOrganTree } from '@/api/authority-management'
  import {
    getsysDictListById,
    getThreeRegisterCount,
    getThreeRegisterYear
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
        riskTotal: 0,
        riskProfession: '',
        filterYear: '2021',
        riskList: [],
        barList: {
          xAxisData: [],
          seriesData: []
        },
        riskDimension: '1',
        riskDate: ['2021-04-01', '2021-04-30'],
        startTime: '2021-04-01',
        endTime: '2021-04-30',
        riskContent: '',
        riskYearContent:''
      }
    },
    created() {
      this.__fetchSelectList()
      this.getYearAnalysis()
    },
    methods: {
      __fetchSelectList() {
        this.riskList = []
        let parentId = ''
        if (this.riskDimension == 1) {
          // 严重程度
          parentId = Number(24)
        } else if (this.riskDimension == 2) {
          // 班次
          parentId = Number(10088)
        }
        const query = {
          parentId: parentId
        }
        getsysDictListById(query.parentId).then(response => {
          response.data.forEach(item => {
            this.riskList.push({
              name: item.dictName,
              value: 0
            })
          })
          this.riskCount()
        })
      },
      radioChange(val) {
        this.riskDimension = val
        this.__fetchSelectList()
      },
      riskCount() {
        const query = {
          beginTime: this.startTime,
          endTime: this.endTime,
          type: this.riskDimension
        }

        getThreeRegisterCount(query).then(response => {
          this.barList.xAxisData = []
          this.barList.seriesData = []
          this.riskContent =''
          this.riskTotal = 0
          if (response.data.length > 0) {
            response.data.forEach(Ditem => {
              if (Ditem) {
                if(this.riskDimension != 3){
                  this.riskList.forEach(Ritem => {
                    if (Ditem.title == Ritem.name) {
                      Ritem.value = Ditem.count
                      this.riskTotal = this.riskTotal + Ditem.count
                    }
                  })
                }else{
                  console.log(this.riskList);
                  this.riskList.push({
                    name: Ditem.title,
                    value: Ditem.count
                  })
                  this.riskTotal = this.riskTotal + Ditem.count
                }
              }
            })
            this.riskContent = '全矿共查出三违' + this.riskTotal + '人次,'
            if(this.riskDimension == 1){
              for (let r of this.riskList) {
                if(this.riskTotal == 0){
                  this.riskContent = this.riskContent + '查出' + r.name + '程度违规' + r.value + '人次,占比0%。'
                }else{
                  this.riskContent = this.riskContent + '查出' + r.name + '程度违规' + r.value + '人次,占比' + r.value/this.riskTotal*100 + '%。'
                }
                this.barList.xAxisData.push(r.name)
                this.barList.seriesData.push(r.value)
              }
            }else if(this.riskDimension == 2){
              for (let r of this.riskList) {
                if(this.riskTotal == 0){
                  this.riskContent = this.riskContent + '查出' + r.name + '班次违规' + r.value + '人次,占比0%。'
                }else{
                  this.riskContent = this.riskContent + '查出' + r.name + '班次违规' + r.value + '人次,占比' + r.value/this.riskTotal*100 + '%。'
                }
                this.barList.xAxisData.push(r.name)
                this.barList.seriesData.push(r.value)
              }
            }else if(this.riskDimension == 3){
              for (let r of this.riskList) {
                if(this.riskTotal == 0){
                  this.riskContent = this.riskContent + '查出' + r.name + '部门违规' + r.value + '人次,占比0%。'
                }else{
                  this.riskContent = this.riskContent + '查出' + r.name + '部门违规' + r.value + '人次,占比' + r.value/this.riskTotal*100 + '%。'
                }
                this.barList.xAxisData.push(r.name)
                this.barList.seriesData.push(r.value)
              }
            }
          } else {
            this.riskList= []
          }
        })
      },
      DateChange(date){
        if (!date) {
          this.startTime = ''
          this.endTime = ''
        } else {
          this.startTime = this.dateConversion(date[0])
          this.endTime = this.dateConversion(date[1])
        }
        this.riskCount()
      },
      dateConversion(date) {
        var d = new Date(date);
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return datetime
      },
      // 改变筛选年份
      yearChange(year) {
        let date = new Date(year);
        this.filterYear = date.getFullYear().toString()
        this.getYearAnalysis()
      },
      getYearAnalysis(){
        this.lineData.name = []
        this.lineData.value = []
        let lineLsit= []
        let maxCount= {}
        let num = 1
        const query={
          year: this.filterYear
        }
        getThreeRegisterYear(query).then(response =>{
          if(response.data.length > 0){
            lineLsit =response.data
            for(let i = 0; i < lineLsit.length; i++){
              this.lineData.name.push(lineLsit[i].title)
              this.lineData.value.push(lineLsit[i].count)
              if(num == 1){
                maxCount = lineLsit[i]
                num++
              }else{
                if(lineLsit[i].count > maxCount.count){
                  maxCount = lineLsit[i]
                }
              }
            }
            this.riskYearContent = "出现违章最多的月份是"+ maxCount.title + '共计' + maxCount.count + '人次。'
          }else{
            this.riskYearContent = ''
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
      width: 100%;
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

      &.line-detail {
        float: left;
        width: 100%;

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
