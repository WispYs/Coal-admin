<template>
  <div class="content worksheep-content">
    <div class="content-title">
      <span>当日跟班情况</span>
      <el-select v-model="region" placeholder="请选择区域" class="title-select">
        <el-option
          v-for="item in regionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="content-box">
      <el-table
        :data="WorkSheepData"
        border
        style="width: 100%;"
        header-cell-class-name="pre-line"
      >
        <el-table-column
          prop="addr"
          label="区域"
          align="center"
        />
        <el-table-column
          prop="sum"
          label="岗位总数"
          align="center"
        />
        <el-table-column
          prop="person"
          label="跟班负责人"
          align="center"
        />
      </el-table>

    </div>
  </div>
</template>
<script>
import { WorkSheepData } from '@/data/dashboard'

export default {
  data() {
    return {
      regionList: [],
      region: '',
      WorkSheepData
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/dashboard.scss';
.worksheep-content {
  .pre-line {
    background: #f5f7fa;
  }
}

</style>
