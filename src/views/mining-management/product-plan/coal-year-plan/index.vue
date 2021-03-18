<template>
  <div class="page-container report-table">
    <!-- <div class="report-button">
      <el-button type="primary" size="small"
        ><i class="el-icon-upload2 el-icon--left" />导出</el-button
      >
    </div> -->
    <div class="top">
      <el-button @click="upYear" size="mini" type="primary">上一年</el-button>
      <span class="data-picker"
        >日期：<el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></span>
      <el-button size="mini" @click="downYear" type="primary">下一年</el-button>
    </div>

    <h2 class="title">2020年煤巷明细表(按队伍)</h2>

    <el-table
      :cell-style="cellStyle"
      show-summary
      :span-method="objectSpanMethod"
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
      @cell-dblclick="cellDbClick"
    >
      <el-table-column
        label="队伍编号"
        class-name="column-bg-color-editable"
        prop="no"
      >
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'no')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.no"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.no }}</span>
          </template>
        </template>
        <!-- <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'addr')">
            <el-input
              v-model="scope.row[column.field]"
              size="small"
              @blur="onBlur()"
            />
          </template>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="name"
        label="巷道名称"
        class-name="column-bg-color-editable"
      >
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'name')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.name"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur()"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.name }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="mh" label="煤厚"></el-table-column>
      <el-table-column prop="dm" label="断面"> </el-table-column>

      <el-table-column prop="zhxs" label="支护形式"> </el-table-column>

      <el-table-column label="工程起止日期">
        <el-table-column prop="kg" label="开工"> </el-table-column>
        <el-table-column prop="jg" label="竣工">
          <template slot-scope="scope">
            <template v-if="editCurrentCell(scope.row, 'jg')">
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row.jg"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row.jg }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column prop="sjcdgcl" label="设计长度工程量"> </el-table-column>

      <el-table-column prop="ndsygcl" label="年底剩余工程量"> </el-table-column>

      <el-table-column prop="startTime" label="开始时间"> </el-table-column>

      <el-table-column prop="endTime" label="结束时间"> </el-table-column>

      <el-table-column prop="jhgcl" label="计划工程量"> </el-table-column>

      <el-table-column label="2020年">
        <el-table-column prop="_1yue" label="1月"> </el-table-column
        ><el-table-column prop="_2yue" label="2月"> </el-table-column
        ><el-table-column prop="_3yue" label="3月"> </el-table-column
        ><el-table-column prop="_4yue" label="4月"> </el-table-column
        ><el-table-column prop="_5yue" label="5月"> </el-table-column
        ><el-table-column prop="_6yue" label="6月"> </el-table-column
        ><el-table-column prop="_7yue" label="7月"> </el-table-column
        ><el-table-column prop="_8yue" label="8月"> </el-table-column
        ><el-table-column prop="_9yue" label="9月"> </el-table-column
        ><el-table-column prop="_10yue" label="10月"> </el-table-column
        ><el-table-column prop="_11yue" label="11月"> </el-table-column
        ><el-table-column prop="_12yue" label="12月"> </el-table-column>
      </el-table-column>

      <el-table-column prop="note" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // name: "煤巷掘进接替年计划表",
  data() {
    return {
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      value: "2021",
      idx: 1,
      options: [
        {
          value: "2020",
          label: "2020"
        },
        {
          value: "2021",
          label: "2021"
        },
        {
          value: "2022",
          label: "2022"
        }
      ],
      tableData: [
        {
          field: "no",
          no: "掘进102队",
          layout: "Text",
          editable: ["no", "name", "jg"],
          name: "1131(1)轨道顺槽",
          mh: "",
          dm: "17.68",
          zhxs: "",
          kg: "",
          jg: "",
          sjcdgcl: "",
          ndsygcl: "",
          startTime: "",
          endTime: "",
          jhgcl: "12420",
          _1yue: "121",
          _2yue: "132",
          _3yue: "456",
          _4yue: "8766",
          _5yue: "97657",
          _6yue: "45345",
          _7yue: "32434",
          _8yue: "54545",
          _9yue: "6576",
          _10yue: "45656",
          _11yue: "6765",
          _12yue: "7657",
          note: ""
        },
        {
          field: "name",
          layout: "Text",
          editable: ["no", "name", "jg"],
          no: "",
          name: "",
          mh: "",
          dm: "",
          zhxs: "",
          kg: "",
          jg: "",
          sjcdgcl: "",
          ndsygcl: "",
          startTime: "",
          endTime: "",
          jhgcl: "12420",
          _1yue: "121",
          _2yue: "132",
          _3yue: "456",
          _4yue: "8766",
          _5yue: "97657",
          _6yue: "45345",
          _7yue: "32434",
          _8yue: "54545",
          _9yue: "6576",
          _10yue: "45656",
          _11yue: "6765",
          _12yue: "7657",
          note: ""
        },
        {
          field: "mh",
          layout: "Text",
          editable: ["no", "name", "jg"],
          no: "",
          name: "",
          mh: "",
          dm: "",
          zhxs: "",
          kg: "",
          jg: "",
          sjcdgcl: "",
          ndsygcl: "",
          startTime: "",
          endTime: "",
          jhgcl: "12420",
          _1yue: "121",
          _2yue: "132",
          _3yue: "456",
          _4yue: "8766",
          _5yue: "97657",
          _6yue: "45345",
          _7yue: "32434",
          _8yue: "54545",
          _9yue: "6576",
          _10yue: "45656",
          _11yue: "6765",
          _12yue: "7657",
          note: ""
        },
        {
          field: "dm",
          layout: "Text",
          editable: ["no", "name", "jg"],
          no: "掘进102队",
          name: "1126（1）工作面",
          mh: "2560",
          dm: "",
          zhxs: "",
          kg: "",
          jg: "",
          sjcdgcl: "",
          ndsygcl: "",
          startTime: "2020-4-1",
          endTime: "2021-5-1",
          jhgcl: "",
          _1yue: "",
          _2yue: "",
          _3yue: "",
          _4yue: "",
          _5yue: "",
          _6yue: "",
          _7yue: "",
          _8yue: "",
          _9yue: "",
          _10yue: "",
          _11yue: "",
          _12yue: "",
          note: ""
        }
      ]
    };
  },
  methods: {
    upYear() {
      if (this.idx <= 0) return;
      this.idx = this.idx - 1;
      this.value = this.options[this.idx].value;
    },
    downYear() {
      if (this.idx >= this.options.length - 1) return;
      this.idx = this.idx + 1;
      this.value = this.options[this.idx].value;
    },
    // 双击单元格
    cellDbClick(row, column, cell, event) {
      row.edit = true;
      if (this.editableField(row.editable, column.property)) {
        this.clickRowIndex = row.rowIndex;
        this.clickField = column.property;
        // 在下次 DOM 更新循环结束之后执行延迟回调
        this.$nextTick(() => {
          if (cell.querySelectorAll("input").length > 0)
            cell.querySelectorAll("input")[0].focus();
        });
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
        return true;
      }
      return false;
    },
    /** 判断单元格字段是否可编辑
     * @param editable  可编辑字段数组
     * @param field     当前字段
     */
    editableField(editable, field) {
      return editable.indexOf(field) > -1;
    },
    // 表格单元格样式，给 row 添加 rowIndex 属性，以便在 doubleClickCell 函数中使用
    cellStyle(obj) {
      Object.defineProperty(obj.row, "rowIndex", {
        value: obj.rowIndex,
        writable: true,
        enumerable: false
      });
      if (this.editableField(obj.row.editable, obj.column.property)) {
        return "background: #fdf5e6;";
      }
    },
    // 失去焦点
    onBlur(row) {
      this.clickRowIndex = null;
      this.clickField = null;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (
        (rowIndex === 0 && columnIndex === 0) ||
        (rowIndex === 0 && columnIndex === 1) ||
        (rowIndex === 1 && columnIndex === 1) ||
        (rowIndex === 2 && columnIndex === 1) ||
        (rowIndex === 3 && columnIndex === 1) ||
        (rowIndex === 1 && columnIndex === 6) ||
        (rowIndex === 2 && columnIndex === 6) ||
        (rowIndex === 3 && columnIndex === 6) ||
        (rowIndex === 0 && columnIndex === 6)
      ) {
        return "bacColorf3d7ab";
      } else if (rowIndex === 6 && columnIndex === 4) {
        return "bacColorf4984e";
      } else if (rowIndex === 6 && columnIndex === 5) {
        return "bacColor317eb0";
      }
    }
  }
};
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
