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
    <h2 style="text-align: center;margin: 20px 0;font-weight: normal;">矿井（中央区）井下反风设施检查维修记录</h2>
    <el-table
      :id="id"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      :cell-style="cellStyle"
      @cell-dblclick="cellDbClick"
    >
      <!-- :span-method="objectSpanMethod" -->
      <el-table-column align="center" label="序号" width="95" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column,index) in config.columns"
        :key="index"
        :label="column.label"
        :width="column.width"
        :align="column.align || 'center'"
        :prop="column.field"
        :sortable="column.sortable"
      >
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, column.field)">
            <!-- input -->
            <el-input
              v-if="column.layout === 'Text'"
              v-model="scope.row[column.field]"
              :placeholder="column.placeholder"
              size="small"
              @blur="onBlur()"
            />

            <!-- select  -->
            <el-select
              v-if="column.layout === 'Select'"
              v-model="scope.row[column.field]"
              :placeholder="column.placeholder"
              style="width: 100%;"
              size="small"
            >
              <el-option
                v-for="it in column.options"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <!-- date-picker  -->
            <el-date-picker
              v-if="column.layout === 'DateTime'"
              v-model="scope.row[column.field]"
              :value-format="column.dateFormat || 'yyyy-MM-dd'"
              type="date"
              :placeholder="column.placeholder"
              style="width: 100%;"
              size="small"
            />

            <!-- slider  -->
            <el-slider v-if="column.layout === 'Slider'" v-model="scope.row[column.field]" />

            <!-- switch -->
            <el-switch v-if="column.layout === 'Switch'" v-model="scope.row[column.field]" />

            <!-- radio -->
            <el-radio-group v-if="column.layout === 'Radio'" v-model="scope.row[column.field]" size="mini">
              <el-radio-button v-for="it in column.options" :key="it.value" :label="it.label" />
            </el-radio-group>

            <!-- checkbox -->
            <el-checkbox-group v-if="column.layout === 'Checkbox'" v-model="scope.row[column.field]" size="mini">
              <el-checkbox-button v-for="it in column.options" :key="it.value" :label="it.label" :name="it.label" />
            </el-checkbox-group>

            <!-- textarea -->
            <el-input v-if="column.layout === 'Textarea'" v-model="scope.row[column.field]" type="textarea" :placeholder="column.placeholder" @blur="onBlur()" />

          </template>
          <template v-else>
            <span v-if="column.options">
              {{ filterField(column.options, scope.row[column.field]) }}
            </span>
            <span v-else>{{ scope.row[column.field] }}</span>

          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getReportList } from '@/api/table'
import exportExcel from '@/utils/export-excel'

export default {
  data() {
    return {
      id: 'report-table',
      list: [],
      listLoading: true,
      config: {
        columns: [
          { label: '采区', field: 'region', layout: 'Text', placeholder: '请填写采区' },
          { label: '地点', field: 'addr', layout: 'Text', placeholder: '请填写地点' },
          { label: '风门编号', field: 'id', layout: 'Text', placeholder: '请填写风门编号' },
          { label: '风门类型', field: 'type', layout: 'Text', placeholder: '请填写风门类型' },
          { label: '存在的问题及处理结果', field: 'problem', layout: 'Text', placeholder: '请填写问题' },
          { label: '备注', field: 'remark', layout: 'Text', placeholder: '请填写备注' },
          { label: '检查人', field: 'person', layout: 'Text', placeholder: '请填写检查人' },
          { label: '检查时间', field: 'date', layout: 'Text', placeholder: '请填写检查时间' }

        ]
      },
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
            region: '',
            addr: '',
            id: '',
            type: '',
            problem: '',
            remark: '',
            person: '',
            date: '',
            editable: ['region', 'addr', 'id', 'type', 'problem', 'remark', 'person', 'date']
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
        return 'background: #fdf5e6;'
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
