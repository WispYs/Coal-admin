<template>
  <div class="safety-wrapper">
    <div v-for="(item, index) in safetyList" :key="index" class="safety-item">
      <div :class="['safety-item__title', item.more ? 'has-more': ''] ">
        <p>{{ item.title }}</p>
        <span v-if="item.more" class="title-more">更多 >></span>
      </div>
      <div class="safety-item__content">
        <component :is="item.component" :cdata="item.data" />
      </div>
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
      title: '安全管理',
      safetyList: [
        { title: '2021年度三违', data: [
          { value: 69, name: '红线', itemStyle: { color: '#16dfcb' }},
          { value: 31, name: '一般', itemStyle: { color: '#2db8ff' }},
          { value: 14, name: '严重', itemStyle: { color: '#faad14' }},
          { value: 4, name: '重点', itemStyle: { color: '#9456fb' }}
        ], component: PieChart1 },
        { title: '5月三违', data: [
          { value: 18, name: '早', itemStyle: { color: '#16dfcb' }},
          { value: 15, name: '中', itemStyle: { color: '#2db8ff' }},
          { value: 3, name: '夜', itemStyle: { color: '#faad14' }}
        ], component: PieChart1 },
        { title: '本日三违', data: {
          yAxis: [1, 2, 3, 2, 1, 2, 0],
          xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
          color: '#9f53df'
        }, component: LineChart },
        { title: '三违信息', data: {
          config: [
            { label: '人员名称', field: 'name' },
            { label: '单位名称', field: 'team' },
            { label: '本月人数', field: 'monthNum', align: 'center' },
            { label: '年度个数', field: 'yearNum', align: 'center' }
          ],
          value: [
            { name: '代于兵', team: '开拓三区303队', monthNum: '0', yearNum: '3' },
            { name: '王苏', team: '开拓三区305队', monthNum: '4', yearNum: '6' },
            { name: '李东升', team: '开拓三区306队', monthNum: '1', yearNum: '2' },
            { name: '马苏德', team: '开拓三区308队', monthNum: '0', yearNum: '2' }
          ]
        }, component: ListComponent, more: true },
        { title: '2021年度隐患', data: [
          { value: 103, name: '一般隐患A', itemStyle: { color: '#16dfcb' }},
          { value: 55, name: '一般隐患B', itemStyle: { color: '#2db8ff' }},
          { value: 45, name: '一般隐患C', itemStyle: { color: '#faad14' }},
          { value: 20, name: '重大隐患', itemStyle: { color: '#d061f5' }}
        ], component: PieChart2 },
        { title: '5月隐患', data: [
          { value: 103, name: '一般隐患A', itemStyle: { color: '#16dfcb' }},
          { value: 55, name: '一般隐患B', itemStyle: { color: '#2db8ff' }},
          { value: 45, name: '一般隐患C', itemStyle: { color: '#faad14' }},
          { value: 20, name: '重大隐患', itemStyle: { color: '#d061f5' }}
        ], component: PieChart2 },
        { title: '本日隐患', data: {
          yAxis: [1, 1, 2, 1, 3, 4, 2],
          xAxis: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
          color: '#1fefff'
        }, component: LineChart },
        { title: '隐患信息', data: {
          config: [
            { label: '隐患部门', field: 'dep' },
            { label: '隐患信息', field: 'info' },
            { label: '隐患状态', field: 'status', align: 'center' }
          ],
          value: [
            { dep: '开扩二区', info: '1611切眼皮带机头防护栏固定', status: '待复查' },
            { dep: '掘进一区', info: '1611切眼皮带机头防护栏固定', status: '待复查' },
            { dep: '掘进二区', info: '1611切眼皮带机头防护栏固定', status: '待复查' },
            { dep: '掘进三区', info: '1611切眼皮带机头防护栏固定', status: '待复查' }
          ]
        }, component: ListComponent, more: true },
        { title: '2021年度风险', data: [
          { title: '轻微风险', value: 35, className: 'blue' },
          { title: '一般风险', value: 44, className: 'green' },
          { title: '较大风险', value: 86, className: 'purple' },
          { title: '重大风险', value: 52, className: 'orange' }
        ], component: ProgressComponent },
        { title: '5月风险', data: [
          { title: '轻微风险', value: 35, className: 'blue' },
          { title: '一般风险', value: 44, className: 'green' },
          { title: '较大风险', value: 86, className: 'purple' },
          { title: '重大风险', value: 52, className: 'orange' }
        ], component: ProgressComponent },
        { title: '辨识类别（风险）', data: [
          { value: 35, name: '设计前', itemStyle: { color: '#9456fb' }},
          { value: 25, name: '变化后', itemStyle: { color: '#2db8ff' }},
          { value: 25, name: '施工前', itemStyle: { color: '#16dfcb' }},
          { value: 15, name: '事故后', itemStyle: { color: '#faad14' }}
        ], component: PieChart3 },
        { title: '敏感信息', data: {
          config: [
            { label: '专业', field: 'profession' },
            { label: '问题描述', field: 'discribe' }
          ],
          value: [
            { profession: '机电运输', discribe: '南区副井双罐主提升钢丝绳窜绳' },
            { profession: '机电运输', discribe: '南区副井双罐主提升钢丝绳窜' },
            { profession: '生产调度', discribe: '南区副井双罐主提升钢丝绳窜' },
            { profession: '采掘管理', discribe: '1611切眼皮带机头防护栏固定' }
          ]
        }, component: ListComponent, more: true }
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
  height: 9rem;
  .safety-item {
    float: left;
    width: calc((100% - 0.6rem)/4);
    height: 2.8rem;
    margin-right: .2rem;
    margin-bottom: .3rem;
    background: url('~@/assets/images/big-data_safety.png') no-repeat;
    background-size: cover;
    &:nth-of-type(4n) {
      margin-right: 0;
    }
    &__title {
      padding: 0 .15rem;
      color: #62eaff;
      p {
        @include ellipsis(100%);
        height: .48rem;
        line-height: .48rem;
        font-size: .2rem;
      }
      &.has-more {
        @include clearfix;
        p {
          @include ellipsis(calc(100% - .6rem));
          float: left;
        }
        .title-more {
          float: right;
          width: .6rem;
          height: .48rem;
          line-height: .48rem;
          font-size: .16rem;
          cursor: pointer;
          overflow: hidden;
        }
      }

    }
    &__content {
      height: calc(100% - .48rem);
      overflow: hidden;
    }
  }
}

</style>
