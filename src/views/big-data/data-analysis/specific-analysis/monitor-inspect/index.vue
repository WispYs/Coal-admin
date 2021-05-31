<template>
  <div class="safety-wrapper">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div v-for="(item, index) in safetyList1" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content">
              <component :is="item.component" :cdata="item.data" />
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="safety-item_C" v-for="(item, index) in dataMain" :key="index" style="font-size:12px">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content">
              <component :is="item.component" :cdata="item.data" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div v-for="(item, index) in safetyList2" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content">
              <component :is="item.component" :cdata="item.data" />
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div v-for="(item, index) in safetyList" :key="index" class="safety-item">
            <div class="safety-item__title">{{ item.title }}</div>
            <div class="safety-item__content">
              <component :is="item.component" :cdata="item.data" />
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
        title: '三违信息', data: {
          config: [
            { label: '传感器类型', field: 'type' },
            { label: '安装地点', field: 'site' },
            { label: '实时值', field: 'realTime', align: 'center' },
            { label: '单位', field: 'unit', align: 'center' },
            { label: '状态', field: 'state', align: 'center' },
            { label: '时间', field: 'time', align: 'center' }
          ],
          value: [
            { type: '断电器', site: '中央至东翼矸石胶带机巷备局备锁39403', realTime: '24', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '高低浓甲烷', site: '中央区13槽山下', realTime: '36', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '环境温度', site: '中央至东翼矸石胶带机巷备局备锁39403', realTime: '18', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '风速', site: '中央区13槽山下上口', realTime: '54', unit: 'm/s',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '断电器', site: '中央区13槽山下', realTime: '36', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '环境温度', site: '中央至东翼矸石胶带机巷备局备锁39403', realTime: '18', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '环境温度', site: '中央至东翼矸石胶带机巷备局备锁39403', realTime: '18', unit: '℃',state:'正常',time:'2021-05-13 12:19:20'},
            { type: '风速', site: '中央区13槽山下上口', realTime: '54', unit: 'm/s',state:'正常',time:'2021-05-13 12:19:20'},
          ],
          button_visible: true
        }, component: ListComponent }],
      safetyList1: [
        {title: '产量情况', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
          color: '#9f53df'
        }, component: LineChart},
        {
          title: '水文监测', data: {
            config: [
              { label: '空号', field: 'type' },
              { label: '检测值', field: 'site' },
              { label: '单位', field: 'realTime', align: 'center' },
              { label: '时间', field: 'unit', align: 'center' }
            ],
            value: [
              { type: 'C3III灰1', site: '52', realTime: '十北C3-II孔', unit:'2021-05-13'},
              { type: 'C3III灰2', site: '52', realTime: '十北C3-II孔', unit:'2021-05-13'},
              { type: 'C3III灰3', site: '52', realTime: '十北C3-II孔', unit:'2021-05-13'},
              { type: 'C3III灰4', site: '52', realTime: '十北C3-II孔', unit:'2021-05-13'}
            ]
          }, component: ListComponent }
      ],
      safetyList2: [
        {title: '销量额', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['2020-11', '2020-12', '2021-1', '2021-2', '2021-3'],
          color: '#9f53df'
        }, component: LineChart},
        {
          title: '锚杆应力值', data: {
            config: [
              { label: '测站', field: 'type' },
              { label: '传感器', field: 'site' },
              { label: '状态', field: 'realTime', align: 'center' },
              { label: '轴力', field: 'unit', align: 'center' },
              { label: '位置', field: 'place', align: 'center' }
            ],
            value: [
              { type: '1126轨顺05测站', site: '9003', realTime: '正常', unit:'114.29',place:'0.65'},
              { type: '1126轨顺05测站', site: '9003', realTime: '正常', unit:'114.29',place:'0.65'},
              { type: '1126轨顺05测站', site: '9003', realTime: '正常', unit:'114.29',place:'0.65'},
              { type: '1126轨顺05测站', site: '9003', realTime: '正常', unit:'114.29',place:'0.65'}
            ]
          }, component: ListComponent }
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
        {
          title: '核子称实时数据', data: {
            config: [
              { label: '名称', field: 'type' },
              { label: '流量', field: 'site' },
              { label: '日产量', field: 'realTime', align: 'center' },
              { label: '月产量', field: 'unit', align: 'center' },
              { label: '年产量', field: 'place', align: 'center' }
            ],
            value: [
              { type: '1号称', site: '0.0', realTime: '9429.9', unit:'46632.9',place:'2696332.65'},
              { type: '2号称', site: '0.0', realTime: '9429.9', unit:'46632.9',place:'2696332.65'},
              { type: '3号称', site: '0.0', realTime: '9429.9', unit:'46632.9',place:'2696332.65'},
              { type: '4号称', site: '0.0', realTime: '9429.9', unit:'46632.9',place:'2696332.65'},
            ]
          }, component: ListComponent }
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
    &__content {
      height: calc(100% - .48rem);
    }
  }
  .safety-item_C{
    background: url('~@/assets/images/big_data_monitor.png') no-repeat;
    background-size: cover;
    height: 5.85rem;
    width: 100%;
  }
}

</style>
