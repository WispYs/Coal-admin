<template>
  <div class="app-container">
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="person" label="负责人" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.person }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="time" label="项目时间" width="350">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="completed" label="完成率" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.completed }}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="money" label="金额（元）" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="项目状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | typeFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row, scope.$index)">查看</el-button>
          <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { typeFilter, statusFilter } from '@/utils/format'
import eventHub from '@/utils/event-hub'

export default {
  filters: {
    typeFilter,
    statusFilter
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
    editorClick(data) {
      eventHub.$emit('open-editor-dialog', true, data)
    },
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
    handleClick(row, index) {
      console.log(row, index)
    }
  }
}
</script>
