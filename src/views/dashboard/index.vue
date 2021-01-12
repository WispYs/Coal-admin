<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h3>折线图</h3>
      <line-chart v-loading="loading" :cdata="lineData" />
    </div>
  </div>
</template>

<script>
import { getLineData } from '@/api/dashboard'
import LineChart from './components/LineChart'
export default {
  name: 'Dashboard',
  components: {
    LineChart
  },
  data() {
    return {
      loading: true,
      lineData: null
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
        const data = response.data.items
        const nameArr = []
        const valueArr = []
        data.forEach(item => {
          nameArr.push(item.month + '月')
          valueArr.push(item.value)
        })
        this.lineData = {
          name: nameArr,
          value: valueArr
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
