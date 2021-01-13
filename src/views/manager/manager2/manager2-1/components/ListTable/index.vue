<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    show-summary
    :summary-method="getSummaries"
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
  >
    <el-table-column align="center" label="序号" width="95" fixed>
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column label="标题" width="350" prop="title">
      <template slot-scope="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column label="作者" width="110" prop="person" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.person }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="time" label="项目时间" sortable>
      <template slot-scope="scope">
        <i class="el-icon-time" />
        <span>{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="完成率" width="110" prop="completed" align="center">
      <template slot-scope="scope">
        {{ scope.row.completed }}
      </template>
    </el-table-column>
    <el-table-column label="金额（元）" width="150" prop="money" align="center" sortable>
      <template slot-scope="scope">
        {{ scope.row.money }}
      </template>
    </el-table-column>
    <el-table-column class-name="status-col" label="状态" prop="status" width="110" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | typeFilter">{{ scope.row.status | statusFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
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
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 计算合计总工时
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (data && column.property === 'money') {
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
      return sums
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
