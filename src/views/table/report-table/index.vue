<template>
  <div class="page-container report-table">
    <div class="report-button">
      <el-button type="primary" size="medium" @click="save()"><i class="el-icon-upload2 el-icon--left" />保存数据</el-button>
      <el-button type="success" size="medium" plain @click="handelExport()"><i class="el-icon-download el-icon--left" />导出数据</el-button>
    </div>
    <el-table
      :id="id"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      :cell-style="cellStyle"
      header-cell-class-name="pre-line"
      :span-method="objectSpanMethod"
      @cell-dblclick="cellDbClick"
    >
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
                :key="it"
                :label="it"
                :value="it"
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
              <el-radio-button v-for="it in column.options" :key="it" :label="it" />
            </el-radio-group>

            <!-- checkbox -->
            <el-checkbox-group v-if="column.layout === 'Checkbox'" v-model="scope.row[column.field]" size="mini">
              <el-checkbox-button v-for="it in column.options" :key="it" :label="it" :name="it" />
            </el-checkbox-group>

            <!-- textarea -->
            <el-input v-if="column.layout === 'Textarea'" v-model="scope.row[column.field]" type="textarea" :placeholder="column.placeholder" @blur="onBlur()" />

          </template>
          <template v-else>
            <span v-if="column.filter">
              {{ filterField(column.filterName, scope.row[column.field]) }}
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
import { TableConfig } from '@/data/report-table'
import exportExcel from '@/utils/export-excel'

export default {
  data() {
    return {
      id: 'report-table',
      list: [],
      listLoading: true,
      config: TableConfig,
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null // 点击单元格的字段
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
        this.list = response.data.items
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
    // 定义导出Excel表格事件
    handelExport() {
      // 第一个参数为 table 的 id
      // 第二个参数为导出文件的 name
      exportExcel(this.id, 'excel-report-table')
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
        setTimeout(() => {
          if (cell.querySelectorAll('input').length > 0) cell.querySelectorAll('input')[0].focus()
        }, 50)
      }

      // 关于 ref 注册时间的重要说明：
      // 因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！
      // $refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。https://cn.vuejs.org/v2/api/?#ref
      // if (row[column.property]) {
      //   setTimeout(() => {
      //     console.log(`${column.property}${row.rowIndex}`)
      //     console.log(this.$refs[`${column.property}${row.rowIndex}`])
      //     this.$refs[`${column.property}${row.rowIndex}`][0].focus()
      //   }, 50)
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
  .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #999;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #999;
  }

}

</style>
