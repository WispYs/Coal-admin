<template>
  <div class="equip-curve">
    <div class="item-title">
      <p>设备曲线</p>
      <el-select v-model="date" placeholder="请选择" class="title-select" popper-class="decision__select">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-content">
      <equip-curve-chart :cdata="EquipCurveData" />
    </div>
  </div>
</template>
<script>
import EquipCurveChart from './EquipCurveChart'

export default {
  components: { EquipCurveChart },
  data() {
    return {
      date: '五月',
      select: [
        { value: '一月', label: '一月' },
        { value: '二月', label: '二月' },
        { value: '三月', label: '三月' },
        { value: '四月', label: '四月' },
        { value: '五月', label: '五月' },
        { value: '六月', label: '六月' },
        { value: '七月', label: '七月' },
        { value: '八月', label: '八月' },
        { value: '九月', label: '九月' },
        { value: '十月', label: '十月' },
        { value: '十一月', label: '十一月' },
        { value: '十二月', label: '十二月' }
      ],
      EquipCurveData: {
        yAxis: [50, 100, 80, 150, 140, 300, 170],
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
        color: '#1fefff'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .equip-curve {
    display: inline-block;
    width: calc(50% - .1rem);
    height: 2.3rem;

  }

</style>
