<template>
  <div class="page-container report-table">
    <!-- <div class="report-button">
      <el-button type="primary" size="small"
        ><i class="el-icon-edit el-icon--left" />数据校验</el-button
      >
      <el-button type="primary" size="small"
        ><i class="el-icon-upload2 el-icon--left" />导出</el-button
      >
      <el-button type="primary" size="small"
        ><i class="el-icon-plus el-icon--left" />增加记录</el-button
      >
      <el-button type="primary" size="small"
        ><i class="el-icon-delete el-icon--left" />删除列行</el-button
      >
      <el-button type="primary" size="small"
        ><i class="el-icon-check el-icon--left" />提交</el-button
      >
    </div> -->

    <div class="top">
      <el-button size="mini" type="primary" @click="upYear">上一年</el-button>
      <span
        class="data-picker"
      >日期：<el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /> </el-select></span>
      <el-button size="mini" type="primary" @click="downYear">下一年</el-button>
      <!-- <el-button size="mini" type="primary">上一页</el-button>
      <span class="data-picker"
        >月份：<el-date-picker
          size="mini"
          v-model="data"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker
      ></span>
      <el-button size="mini" type="primary">下一页</el-button>
      <el-button size="mini" type="primary">同步上一月计划</el-button> -->
    </div>

    <h2 class="title">2020-12月掘进工作面作业计划</h2>

    <el-table
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
      :cell-style="cellStyle"
      @cell-dblclick="cellDbClick"
    >
      <el-table-column prop="no" label="序号" />
      <el-table-column prop="sgdw" label="施工单位" />
      <el-table-column prop="sskq" label="所属矿区" />
      <el-table-column label="巷道情况">
        <el-table-column prop="dwgcmc" label="单位工程名称" />
        <el-table-column prop="zjly" label="资金来源">
          <template slot-scope="scope">
            <template v-if="editCurrentCell(scope.row, 'zjly')">
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row.zjly"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row.zjly }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sjgcl" label="设计工程量" />
        <el-table-column prop="sygcl" label="剩余工程量" />
        <el-table-column prop="mylb" label="煤岩类别" />
        <el-table-column prop="dm" label="断面(m²)" />
        <el-table-column prop="jjfs" label="掘进方式" />
        <el-table-column prop="zhxs" label="支护形式" />
      </el-table-column>

      <el-table-column label="起止日期">
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column prop="days" label="天数" />
      </el-table-column>

      <el-table-column label="本月计划(m)">
        <el-table-column prop="gcl" label="工程量" />
        <el-table-column prop="gzl" label="工作量" />
      </el-table-column>

      <el-table-column prop="note" label="备注" />
    </el-table>

    <p class="report-table__tip">备注：<span class="green">绿色</span>区域为手填区域，<span class="blue">蓝色</span>为非手填区域由公式自动计算，对输入的各危险源类的不同风险等级进行累加求和。</p>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.scss'
export default {
  data() {
    return {
      variables,
      value: '2021',
      idx: 1,
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
      ],
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      data: '',
      tableData: [
        {
          no: '',
          layout: 'Text',
          editable: ['zjly'],
          sgdw: 'A',
          sskqdwgcmc: '',
          zjly: '岩巷',
          sjgcl: '',
          sygcl: '',
          mylb: '',
          dm: '',
          jjfs: '',
          zhxs: '',
          startTime: '',
          endTime: '',
          days: '',
          gcl: '0',
          gzl: '0',
          note: ''
        },
        {
          no: '2',
          layout: 'Text',
          editable: ['zjly'],
          sgdw: '',
          sskqdwgcmc: '',
          zjly: '',
          sjgcl: '',
          sygcl: '',
          mylb: '',
          dm: '',
          jjfs: '',
          zhxs: '',
          startTime: '',
          endTime: '',
          days: '',
          gcl: '',
          gzl: '',
          note: ''
        }
      ]
    }
  },
  methods: {
    upYear() {
      if (this.idx <= 0) return
      this.idx = this.idx - 1
      this.value = this.options[this.idx].value
    },
    downYear() {
      if (this.idx >= this.options.length - 1) return
      this.idx = this.idx + 1
      this.value = this.options[this.idx].value
    },
    // 双击单元格
    cellDbClick(row, column, cell, event) {
      if (this.editableField(row.editable, column.property)) {
        this.clickRowIndex = row.rowIndex
        this.clickField = column.property
        // 在下次 DOM 更新循环结束之后执行延迟回调
        this.$nextTick(() => {
          if (cell.querySelectorAll('input').length > 0) { cell.querySelectorAll('input')[0].focus() }
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
      if (
        this.editableField(row.editable, field) &&
        row.rowIndex === this.clickRowIndex &&
        field === this.clickField
      ) {
        return true
      }
      return false
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
    // 失去焦点
    onBlur(row) {
      this.clickRowIndex = null
      this.clickField = null
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 4) {
        return 'bacColorf3d7ab'
      } else if (rowIndex === 1 && columnIndex === 1) {
        return 'bacColorcccccc'
      } else if (rowIndex === 6 && columnIndex === 5) {
        return 'bacColor317eb0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

  // 修改边框颜色
  .el-table td,
  .el-table th.is-leaf,
  .el-table--border,
  .el-table--group {
    // border-color: #999;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    // background-color: #999;
  }
}
.top {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.title {
  text-align: center;
  margin: 20px auto;
}
.data-picker {
  margin: 0 10px;
}
.table-row {
  text-align: center;
}
::v-deep .el-table th > .cell {
  text-align: center !important;
}
</style>
