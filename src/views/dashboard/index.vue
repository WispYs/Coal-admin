<template>
  <div class="page-container dashboard-wrapper">
    <el-row :gutter="20">
      <el-col :span="19">
        <div class="chart-wrapper">
          <el-row :gutter="15" style="margin-bottom: 20px;">
            <el-col :span="16">
              <safe-content />
            </el-col>
            <el-col :span="8">
              <work-sheep-content />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <product-content />
            </el-col>
            <el-col :span="14">
              <working-content />
            </el-col>
          </el-row>

        </div>
      </el-col>
      <el-col :span="5">
        <aside-content />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getLineData } from '@/api/dashboard'
import SafeContent from './components/SafeContent'
import WorkSheepContent from './components/WorkSheepContent'
import ProductContent from './components/ProductContent'
import WorkingContent from './components/WorkingContent'
import AsideContent from './components/AsideContent'
export default {
  name: 'Dashboard',
  components: {
    SafeContent,
    WorkSheepContent,
    ProductContent,
    WorkingContent,
    AsideContent
  },
  data() {
    return {
      loading: true,
      lineData: {
        name: [],
        value: []
      },
      barData: {
        name: [],
        value: []
      },
      pieData: null,
      years: [
        { value: '2020', label: '2020年' },
        { value: '2019', label: '2019年' },
        { value: '2018', label: '2018年' },
        { value: '2017', label: '2017年' },
        { value: '2016', label: '2016年' }
      ],
      filterYear: '2020',
      lineCount: 0,
      filterTime: []

    }
  },
  mounted() {
    this.__fetchLineData()
  },
  methods: {
    __fetchLineData() {
      this.loading = true
      getLineData().then(response => {
        this.loading = false
        this.lineCount = response.data.lineCount
        const line = response.data.lineData
        const bar = response.data.barData
        const pie = response.data.barData
        const lineName = []
        const lineValue = []
        const barName = []
        const barValue = []

        line.forEach(item => {
          lineName.push(item.month + '月')
          lineValue.push(item.value)
        })
        bar.forEach(item => {
          barName.push(item.name)
          barValue.push(item.value)
        })
        this.lineData = {
          name: lineName,
          value: lineValue
        }
        this.barData = {
          name: barName,
          value: barValue
        }
        this.pieData = pie
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.dashboard-wrapper {
  @include clearfix;
  background: $pageBg !important;
}

</style>
