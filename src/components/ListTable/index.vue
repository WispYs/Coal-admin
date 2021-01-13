<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    :show-summary="config.summary"
    :summary-method="(param) => getSummaries(param, config.summaryField)"
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
  >
    <el-table-column align="center" label="ID" width="95" fixed>
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="column in config.columns"
      :key="column.field"
      :label="column.label"
      :width="column.width"
      :align="column.align || 'center'"
      :prop="column.field"
      :sortable="column.sortable"
    >
      <template slot-scope="scope">
        <span v-if="column.filter">
          {{ filterMethod(column.filter, scope.row[column.field]) }}
        </span>
        <span v-else>{{ scope.row[column.field] }}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="config.button" fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row, scope.$index)">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: 'success',
        2: '',
        3: 'info',
        4: 'danger'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        1: '已完成',
        2: '进行中',
        3: '未开始',
        4: '已搁置'
      }
      return statusMap[status]
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // filter
    filterMethod(filter, field) {
      if (filter === 'statusFilter') {
        const statusMap = {
          1: '已完成',
          2: '进行中',
          3: '未开始',
          4: '已搁置'
        }
        return statusMap[field]
      }
      // ...
      // if(filter === 'typeFilter') {

      // }
    },
    // 计算合计总工时
    getSummaries(param, field) {
      if (!field) {
        return false
      }
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        field.forEach((it, i) => {
          if (data && column.property === it) {
            const values = data.map(item => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              const prevNum = Number(prev)
              if (!isNaN(value)) {
                return prevNum + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        })
      })
      return sums
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    },
    handleClick(row, index) {
      console.log(row, index)
    }
  }
}
</script>
<style lang="scss">

</style>
