<template>
  <div class="safety-wrapper">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div v-for="(item, index) in safetyList1" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content" style="margin-top: 0.3rem;">
              <component :is="item.component" :cdata="item.data" />
              <div style="color: #fff;display: flex;font-size: 0.14rem;text-align: center;margin-top: 0.16rem;">
                <div style="flex: 1;">同比增加(万元): -3.55</div>
                <div style="flex: 1;">环比增加(万元): 13.62</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="safety-item_C" style="font-size:12px">
            <div style="display: flex;width: calc(100% - 30px);margin:auto;">
              <div style="flex: 1" class="safety_C_item" v-for="(item, index) in dataMain" :key="index">
                <div class="safety-item__title">{{ item.amount }}</div>
                <div class="safety-item__content">{{ item.name }}</div>
              </div>
            </div>
            <div style="width:calc(100% - 20px);margin: 0.2rem auto 0;display: flex;">
              <div style="flex: 1;">
                <el-col :span="6" class="safety_C_item1" v-for="(item, index) in dataMain1" :key="index">
                  <div class="safety-item__title">{{ item.amount }}</div>
                  <div class="safety-item__content">{{ item.name }}</div>
                </el-col>
              </div>
              <div style="flex: 2;">
              </div>
              <div style="flex: 1;">
                <el-col :span="6" class="safety_C_item2" v-for="(item, index) in dataMain2" :key="index">
                  <div class="safety-item__title">{{ item.amount }}</div>
                  <div class="safety-item__content">{{ item.name }}</div>
                </el-col>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div v-for="(item, index) in safetyList2" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content" style="margin-top: 0.3rem;">
              <component :is="item.component" :cdata="item.data" />
              <div style="color: #fff;display: flex;font-size: 0.14rem;text-align: center;margin-top: 0.16rem;">
                <div style="flex: 1;">同比增加(万元): -3.55</div>
                <div style="flex: 1;">环比增加(万元): 13.62</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div v-for="(item, index) in safetyList" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content" style="margin-top: 0.3rem;">
              <component :is="item.component" :cdata="item.data" />
              <div v-if="item.text" style="color: #fff;display: flex;font-size: 0.14rem;text-align: center;margin-top: 0.16rem;">
                <div style="flex: 1;">同比增加(万元): -3.55</div>
                <div style="flex: 1;">环比增加(万元): 13.62</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import PieChart1 from './components/PieChart1'
import PieChart2 from './components/PieChart2'
import PieChart3 from './components/PieChart3'
import LineChart from './components/LineChart'
import ListComponent from './components/ListComponent'
import ProgressComponent from './components/ProgressComponent'
export default {
  components: {
    PieChart1,
    PieChart2,
    PieChart3,
    LineChart,
    ListComponent,
    ProgressComponent
  },
  data() {
    return {
      dataMain:[{
        amount: "10012",
        name: "当日产量(吨)"
      },{
        amount: "10012",
        name: "当月产量(吨)"
      },{
        amount: "10012",
        name: "本年度产量(吨)"
      },{
        amount: "10012",
        name: "本年度计划产量(吨)"
      }],
      dataMain1:[{
        amount: "10012",
        name: "当日进尺(米)"
      },{
        amount: "10012",
        name: "当月进尺(米)"
      },{
        amount: "10012",
        name: "本年度进尺(米)"
      },{
        amount: "10012",
        name: "本年度计划进尺(米)"
      }],
      dataMain2:[{
        amount: "10012",
        name: "当日热量(cal/g)"
      },{
        amount: "10012",
        name: "月度平均热量(cal/g)"
      },{
        amount: "10012",
        name: "年度平均热量(cal/g)"
      },{
        amount: "10012",
        name: "年度平均计划热量(cal/g)"
      }],
      safetyList1: [
        {title: '产量情况', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
          color: '#9f53df'
        }, component: LineChart},
        {title: '进尺情况', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
          color: '#9f53df'
        }, component: LineChart}
      ],
      safetyList2: [
        {title: '销量额', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['2020-11', '2020-12', '2021-1', '2021-2', '2021-3'],
          color: '#9f53df'
        }, component: LineChart},
        {title: '销量情况', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['2020-11', '2020-12', '2021-1', '2021-2', '2021-3'],
          color: '#1fefff'
        }, component: LineChart}
      ],
      safetyList: [
        { title: '原煤化验', data: [
          { value: 20, title: '原煤热量', color: '#1fefff'},
          { value: 50, title: '原煤灰分', color: '#00afd8'},
          { value: 70, title: '原煤水分', color: '#5580fd'}
        ], component: ProgressComponent },
        {title: '价格趋势', data: {
          yAxis: [1, 2, 0, 4, 1],
          xAxis: ['4-12', '4-13', '4-14', '4-15','4-16'],
          color: '#00d691'
        }, component: LineChart,text: true},
        {title: '利润趋势', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['2020-11', '2020-12', '2021-1', '2021-2', '2021-3'],
          color: '#00d691'
        }, component: LineChart,text: true},
        { title: '原煤化验', data: [
          { value: 20, title: '原煤热量', color: '#1fefff'},
          { value: 50, title: '原煤灰分', color: '#00afd8'},
          { value: 80, title: '原煤水分', color: '#5580fd'}
        ], component: ProgressComponent },
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.safety-wrapper {
  @include clearfix;
  .safety-item {
    float: left;
    width: 4.5rem;
    height: 2.8rem;
    margin-right: .2rem;
    margin-bottom: .3rem;
    background: url('~@/assets/images/big-data_safety.png') no-repeat;
    background-size: cover;
    &:nth-of-type(4n) {
      margin-right: 0;
    }
    &__title {
      @include ellipsis(100%);
      height: .48rem;
      line-height: .48rem;
      padding: 0 .15rem;
      font-size: .2rem;
      color: #62eaff;
    }
  }
  .safety-item_C{
    background: url('~@/assets/images/big_data_ball.png') no-repeat;
    background-size: cover;
    width: 9.2rem;
    height: 5.9rem;
    width: 100%;

    .safety_C_item{

      background: url('~@/assets/images/big_data_ball_item.png') no-repeat;
      background-size: cover;
      width: 2rem;
      height: 0.84rem;
      text-align: center;
      margin-left: 0.18rem;
      margin-top: 0.15rem;
      .safety-item__title{
        color: #62eaff;
      }
      .safety-item__content{
        color: #ffffff
      }
    }
    .safety_C_item1{
      background: url('~@/assets/images/big_data_ball_item.png') no-repeat;
      background-size: cover;
      width: 2.05rem;
      height: 0.84rem;
      text-align: center;
      margin-left: 0.07rem;
      margin-top: 0.2rem;
      .safety-item__title{
        color: #62eaff;
      }
      .safety-item__content{
        color: #ffffff
      }
    }
    .safety_C_item2{
      background: url('~@/assets/images/big_data_ball_item.png') no-repeat;
      background-size: cover;
      width: 2.05rem;
      height: 0.84rem;
      text-align: center;
      margin-left: 0.1rem;
      margin-top: 0.2rem;
      .safety-item__title{
        color: #62eaff;
      }
      .safety-item__content{
        color: #ffffff
      }
    }
    .safety_C_item:first-child{
      margin-left: 0;
    }
  }
}

</style>
