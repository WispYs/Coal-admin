<template>
  <div class="page-container report-table">
    <div class="top">
      <el-button size="mini" type="primary">上一年</el-button>
      <span class="data-picker">日期：<el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /> </el-select></span>
      <el-button size="mini" type="primary">下一年</el-button>
    </div>
    <h2 style="text-align: center;margin: 20px 0;font-weight: normal;">防灭火情况月报</h2>
    <el-table
      :id="id"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column label="采煤工作面">
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="name"
          label="煤厚(m)"
        />
        <el-table-column
          prop="name"
          label="采高(m)"
        />
        <el-table-column
          prop="name"
          label="开采日期"
        />
        <el-table-column
          prop="name"
          label="预计收作日期"
        />
        <el-table-column
          prop="name"
          label="存在问题"
        />
        <el-table-column
          prop="name"
          label="防火措施"
        />
      </el-table-column>
      <el-table-column label="本月现存收作工作面">
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="name"
          label="收作日期"
        />
        <el-table-column
          prop="name"
          label="存在问题"
        />
        <el-table-column
          prop="name"
          label="防火措施"
        />
        <el-table-column
          prop="name"
          label="封闭日期"
        />
      </el-table-column>
      <el-table-column
        prop="name"
        label="本月新增永久封闭墙个数（分采区或分地点填写）"
      />
    </el-table>
    <el-table
      :id="id"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column label="本月新增高冒地点">
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="name"
          label="最高冒点高度(m)"
        />
        <el-table-column
          prop="name"
          label="冒顶范围长度(m)"
        />

        <el-table-column
          prop="name"
          label="存在问题"
        />
        <el-table-column
          prop="name"
          label="防火措施"
        />

      </el-table-column>
      <el-table-column
        prop="name"
        label="本月在册高冒地点(处)"
      />
      <el-table-column
        prop="name"
        label="注氮机型号/规格"
      />
      <el-table-column
        prop="name"
        label="注氮地点"
      />
      <el-table-column
        prop="name"
        label="束管监测系统型号"
      />
      <el-table-column
        prop="name"
        label="束管监测地点"
      />
      <el-table-column
        prop="name"
        label="灌浆系统能力(m³/h)"
      />
      <el-table-column
        prop="name"
        label="灌浆地点"
      />
      <el-table-column
        prop="name"
        label="灌浆量(黄土m³)"
      />
    </el-table>
  </div>
</template>

<script>
import { getReportList } from '@/api/table'
import exportExcel from '@/utils/export-excel'
import variables from '@/assets/styles/variables.scss'

export default {
  data() {
    return {
      variables,
      id: 'report-table',
      list: [],
      listLoading: true,

      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      value: '2020',
      options: [
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        },
        {
          value: '2022',
          label: '2022'
        }
      ]
    }
  },
  computed: {
    // list 每个字段都添加 edit 属性
    // 此方法也可行，但是需要对数据每个字段均做处理，字段多了影响性能
    // normalizedList() {
    //   let normalizedList = []

    //   normalizedList = this.list.map(it => {
    //     for (const i in it) {
    //       it[i] = {
    //         value: it[i],
    //         edit: false
    //       }
    //     }
    //     return it
    //   })
    //   return normalizedList
    // }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      getReportList().then(response => {
        this.listLoading = false
        this.list = [
          {
            name: ''
          }
        ]
      })
    },
    // 保存数据
    save() {
      this.$confirm('确定保存表格数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.list)
        this.$message.success('保存成功')
      })
    },
    upYear() {
      if (this.idx >= this.options.length - 1) return
      this.idx = this.idx + 1
      this.value = this.options[this.idx].value
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        }
      })

      return sums
    },
    // 定义导出Excel表格事件
    handelExport() {
      // 第一个参数为 table 的 id
      // 第二个参数为导出文件的 name
      exportExcel(this.id, 'excel-report-table')
    },

    // filter 方法
    /**
     * @param {array}   options 字段对应配置项
     * @param {string}  field 过滤值
     */
    filterField(options, field) {
      // 判断值是不是数组
      // 暂不考虑传值为对象的情况（后续对接）
      if (field.constructor === Array) {
        const filters = []
        field.forEach(f => {
          filters.push(options.filter(item => item.value === f)[0].label)
        })
        return filters
      } else {
        const filters = options.filter(item => item.value === field)
        return filters[0] ? filters[0].label : ''
      }
    },

    // 合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    /** 判断单元格字段是否可编辑
     * @param editable  可编辑字段数组
     * @param field     当前字段
     */
    editableField(editable, field) {
      return editable.indexOf(field) > -1
    },

    // 表格单元格样式，给 row 添加 rowIndex 属性，以便在 doubleClickCell 函数中使用
    cellStyle(obj) {
      Object.defineProperty(obj.row, 'rowIndex', {
        value: obj.rowIndex,
        writable: true,
        enumerable: false
      })
      if (this.editableField(obj.row.editable, obj.column.property)) {
        return `background: ${variables.editTable}`
      }
    },
    // 双击单元格
    cellDbClick(row, column, cell, event) {
      if (this.editableField(row.editable, column.property)) {
        this.clickRowIndex = row.rowIndex
        this.clickField = column.property
        // 在下次 DOM 更新循环结束之后执行延迟回调
        this.$nextTick(() => {
          if (cell.querySelectorAll('input').length > 0) cell.querySelectorAll('input')[0].focus()
        })
      }

      // 关于 ref 注册时间的重要说明：
      // 因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！
      // $refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。https://cn.vuejs.org/v2/api/?#ref
      // if (row[column.property]) {
      //   // 在下次 DOM 更新循环结束之后执行延迟回调
      //   this.$nextTick(() => {
      //     console.log(`${column.property}${row.rowIndex}`)
      //     console.log(this.$refs[`${column.property}${row.rowIndex}`])
      //     this.$refs[`${column.property}${row.rowIndex}`][0].focus()
      //   })
      // }
    },

    // 通过点击的行序号和字段锁定当前点击的单元格
    editCurrentCell(row, field) {
      if (this.editableField(row.editable, field) && row.rowIndex === this.clickRowIndex && field === this.clickField) {
        return true
      }
      return false
    },

    // 失去焦点
    onBlur() {
      this.clickRowIndex = null
      this.clickField = null
    }

  }
}
</script>
<style lang="scss">
.report-table {
  padding-bottom: 200px;
  .report-button {
    padding: 10px 0;
  }
  .top {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    .data-picker {
      margin: 0 10px;
    }
  }
  // 去掉选中蓝色背景
  .el-table {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  .editable-cell {
    background: #fdf5e6;
  }
  .el-table thead.is-group th {
    background: #fff;
  }

  // 修改边框颜色
  .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #999;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #999;
  }

}

</style>
