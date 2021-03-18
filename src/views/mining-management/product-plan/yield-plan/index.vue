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
      <!-- <el-button size="mini" type="primary">同步上一月计划</el-button> -->
    </div>

    <h2 class="title">2020-12月产量约月计划</h2>

    <el-table
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
      @cell-dblclick="cellDbClick"
      :cell-style="cellStyle"
    >
      <el-table-column prop="miningTeam" label="采煤区队">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'miningTeam', [3, 4])">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.miningTeam"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.miningTeam }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="workNo" label="工作面编号">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'workNo', [3, 4])">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.workNo"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.workNo }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="miningWidth" label="设计可采长度(m)">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'miningWidth', [3, 4])">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.miningWidth"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.miningWidth }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="miningMethod" label="采煤方法"> </el-table-column>

      <el-table-column prop="meicengqingjiao" label="煤层倾角(°)">
      </el-table-column>

      <el-table-column prop="meihou" label="煤厚(m)"> </el-table-column>

      <el-table-column label="工作日(天)">
        <el-table-column prop="startTime" label="开始时间">
          <template slot-scope="scope">
            <template v-if="editCurrentCell(scope.row, 'startTime', [4])">
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row.startTime"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row.startTime }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template slot-scope="scope">
            <template v-if="editCurrentCell(scope.row, 'endTime', [4])">
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row.endTime"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row.endTime }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="days" label="天数"> </el-table-column>
      </el-table-column>

      <el-table-column label="计算基础">
        <el-table-column prop="width" label="面长(m)"> </el-table-column>
        <el-table-column prop="height" label="采高(m)"> </el-table-column>
        <el-table-column prop="xunhuanjindu" label="循环进度(m)">
        </el-table-column>
        <el-table-column prop="kezhong" label="客重(t/m3)"> </el-table-column>
      </el-table-column>

      <el-table-column label="产量">
        <el-table-column prop="rijun" label="日均"> </el-table-column>
        <el-table-column prop="heji" label="合计"> </el-table-column>
      </el-table-column>

      <el-table-column prop="huifeng" label="灰份(%)"> </el-table-column>

      <el-table-column prop="fareliang" label="发热量(大卡)"> </el-table-column>

      <el-table-column prop="note" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // name: "产量月计划",
  data() {
    return {
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      data: "",
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
          layout: "Text",
          editable: [
            "miningTeam",
            "workNo",
            "miningWidth",
            "startTime",
            "endTime"
          ],
          miningTeam: "金矿总产量",
          workNo: "1126（1）工作面",
          miningWidth: "2560",
          reMainingMiningWidth: "",
          miningMethod: "",
          meicengqingjiao: "",
          meihou: "",
          startTime: "2020-4-1",
          endTime: "2021-5-1",
          days: "",
          width: "",
          height: "",
          xunhuanjindu: "",
          kezhong: "",
          rijun: "32520",
          heji: "1008120",
          huifen: "0.00",
          fareliang: "7749",
          note: ""
        },
        {
          layout: "Text",
          editable: [
            "miningTeam",
            "workNo",
            "miningWidth",
            "startTime",
            "endTime"
          ],
          miningTeam: "回采产量",
          workNo: "1126（2）工作面",
          miningWidth: "1530",
          reMainingMiningWidth: "",
          miningMethod: "",
          meicengqingjiao: "",
          meihou: "",
          startTime: "",
          endTime: "",
          days: "",
          width: "",
          height: "",
          xunhuanjindu: "",
          kezhong: "",
          rijun: "32520",
          heji: "1008120",
          huifen: "0.00",
          fareliang: "7749",
          note: ""
        },
        {
          layout: "Text",
          editable: [
            "miningTeam",
            "workNo",
            "miningWidth",
            "startTime",
            "endTime"
          ],
          miningTeam: "11-2煤层",
          workNo: "1126（3）工作面",
          miningWidth: "1860",
          reMainingMiningWidth: "",
          miningMethod: "",
          meicengqingjiao: "",
          meihou: "",
          startTime: "",
          endTime: "",
          days: "",
          width: "",
          height: "",
          xunhuanjindu: "",
          kezhong: "",
          rijun: "32520",
          heji: "1008120",
          huifen: "0.00",
          fareliang: "7749",
          note: ""
        },
        {
          layout: "Text",
          editable: [
            "miningTeam",
            "workNo",
            "miningWidth",
            "startTime",
            "endTime"
          ],
          miningTeam: "掘进煤",
          workNo: "1126（4）工作面",
          miningWidth: "980",
          reMainingMiningWidth: "",
          miningMethod: "",
          meicengqingjiao: "",
          meihou: "",
          startTime: "",
          endTime: "",
          days: "",
          width: "",
          height: "",
          xunhuanjindu: "",
          kezhong: "",
          rijun: "32520",
          heji: "1008120",
          huifen: "0.00",
          fareliang: "7749",
          note: ""
        },
        {
          layout: "Text",
          editable: [
            "miningTeam",
            "workNo",
            "miningWidth",
            "startTime",
            "endTime"
          ],
          miningTeam: "综采一队",
          workNo: "1126（4）工作面",
          miningWidth: "980",
          reMainingMiningWidth: "",
          miningMethod: "",
          meicengqingjiao: "",
          meihou: "",
          startTime: "2021-2-1",
          endTime: "2021-3-2",
          days: "",
          width: "",
          height: "",
          xunhuanjindu: "",
          kezhong: "",
          rijun: "32520",
          heji: "1008120",
          huifen: "0.00",
          fareliang: "7749",
          note: ""
        }
      ]
    };
  },
  methods: {
    upYear() {
      if (this.idx >= this.options.length - 1) return;
      this.idx = this.idx + 1;
      this.value = this.options[this.idx].value;
    },
    downYear() {
      if (this.idx <= 0) return;
      this.idx = this.idx - 1;
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
    editCurrentCell(row, field, allowRow) {
      const flag = allowRow ? allowRow.includes(row.rowIndex) : true;
      if (
        this.editableField(row.editable, field) &&
        row.rowIndex === this.clickRowIndex &&
        field === this.clickField &&
        flag
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
      // if (
      //   (this.editableField(obj.row.editable, obj.column.property) &&
      //     obj.rowIndex == 3) ||
      //   obj.rowIndex == 4
      // ) {
      //   return "background: #f3d7ab;";
      // }
    },
    // 失去焦点
    onBlur(row) {
      this.clickRowIndex = null;
      this.clickField = null;
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (
        (rowIndex === 3 && columnIndex === 2) ||
        (rowIndex === 3 && columnIndex === 0) ||
        (rowIndex === 3 && columnIndex === 1) ||
        (rowIndex === 4 && columnIndex === 0) ||
        (rowIndex === 4 && columnIndex === 1) ||
        (rowIndex === 4 && columnIndex === 6) ||
        (rowIndex === 4 && columnIndex === 7) ||
        (rowIndex === 4 && columnIndex === 2)
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
