<template>
  <div class="page-container stair-table">
    <stair-chart :cdata="stairData" />
  </div>
</template>

<script>
import StairChart from './components/StairChart'
import stairTableData from '@/data/stair-table'
export default {
  components: {
    StairChart
  },
  data() {
    return {
      stairData: {}
    }
  },
  mounted() {
    this.__fetchStairData()
  },
  methods: {
    __fetchStairData() {
      const nameValue = []
      const beforeStartValue = []
      const workTimeValue = []
      const sDateValue = []
      const eDateValue = []
      const lateDayValue = []
      stairTableData.works.forEach(it => {
        nameValue.push(it.name)
        beforeStartValue.push(it.beforeStart)
        workTimeValue.push(it.workTime)
        sDateValue.push(it.sDate)
        eDateValue.push(it.eDate)
        lateDayValue.push(it.lateDay)
      })
      this.stairData = {
        title: stairTableData.title,
        startTime: stairTableData.startTime,
        name: nameValue,
        beforeStart: beforeStartValue,
        workTime: workTimeValue,
        sDate: sDateValue,
        eDate: eDateValue,
        lateDay: lateDayValue
      }
    }
  }

}
</script>
