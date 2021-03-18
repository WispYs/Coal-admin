<template>
  <div>
    <div class="report-button">
      <!-- <el-button type="primary" size="small"
        ><i class="el-icon-check el-icon--left" />提交</el-button
      > -->
    </div>

    <h2 class="title">煤矿理念目标和矿长安全承诺标准化评分表</h2>

    <div class="top">
      <span
        >评价年月：<el-date-picker
          :disabled="isView"
          size="small"
          v-model="rateDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker
      ></span>

      <span>录入日期：2020-08-17</span>

      <span>录入人：超级管理员</span>
    </div>

    <el-table
      :cell-style="cellStyle"
      :span-method="objectSpanMethod"
      class="table-row"
      :cell-class-name="cell"
      :data="tableData2"
      style="width: 100%"
      @cell-dblclick="cellDbClick"
    >
      <el-table-column
        label="项目"
        class-name="column-bg-color-editable"
        prop="xm"
      >
      </el-table-column>
      <el-table-column
        label="项目内容"
        class-name="column-bg-color-editable"
        prop="xmnr"
      >
      </el-table-column>
      <el-table-column
        label="基本要求"
        class-name="column-bg-color-editable"
        prop="jbyq"
      >
      </el-table-column>

      <el-table-column
        label="标准分值"
        class-name="column-bg-color-editable"
        prop="bzfz"
      >
      </el-table-column>

      <el-table-column
        label="评价方法"
        class-name="column-bg-color-editable"
        prop="pjff"
      >
      </el-table-column>

      <el-table-column
        label="缺项"
        class-name="column-bg-color-editable"
        prop="qx"
        width="60"
      >
        <template slot-scope="scope">
          <el-checkbox :disabled="isView" v-model="scope.row.qx"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
        label="扣分"
        class-name="column-bg-color-editable"
        prop="kf"
      >
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'kf')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.kf"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.kf }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        label="检查情况及扣分原因"
        class-name="column-bg-color-editable"
        prop="jcqkjkfyy"
      >
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'jcqkjkfyy')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.jcqkjkfyy"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.jcqkjkfyy }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    isView: {
      default: false,
      type: Boolean
    }
  },
  updated() {
    this.clickRowIndex = null;
  },
  data() {
    return {
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      rateDate: "2020-02-08",
      tableData2: [
        {
          layout: "Text",
          editable: ["kf", "jcqkjkfyy"],
          xm: "一、安全生产理念（20分）",
          xmnr: "理念内容",
          jbyq:
            "体现牢固树立安全生产红线意识，贯彻“安全第一、预防为主、综合治理”的安全生产方针",
          bzfz: "4.00",
          pjff: "查资料",
          qx: false,
          kf: 1,
          jcqkjkfyy: ""
        },
        {
          layout: "Text",
          editable: ["kf", "jcqkjkfyy"],
          xm: "一、安全生产理念（20分）",
          xmnr: "理念贯彻",
          jbyq: "1.对安全生产理念的简历、公式",
          bzfz: "4.00",
          pjff: "查资料",
          qx: false,
          kf: 1,
          jcqkjkfyy: ""
        },
        {
          layout: "Text",
          editable: ["kf", "jcqkjkfyy"],
          xm: "一、安全生产理念（20分）",
          xmnr: "理念贯彻",
          jbyq: "2.管理人员和职工理解、认同并践行本单位安全生产理念",
          bzfz: "4.00",
          pjff: "查资料",
          qx: false,
          kf: 1,
          jcqkjkfyy: ""
        },
        {
          layout: "Text",
          editable: ["kf", "jcqkjkfyy"],
          xm: "一、安全生产理念（20分）",
          xmnr: "理念落实",
          jbyq: "安全生产理念融会贯穿于安全生产",
          bzfz: "4.00",
          pjff: "查资料",
          qx: true,
          kf: 1,
          jcqkjkfyy: ""
        }
      ] // 查看列表
    };
  },
  methods: {
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
        !this.isView &&
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
      // if (this.editableField(obj.row.editable, obj.column.property)) {
      //   return "background: #fdf5e6;";
      // }
    },
    // 失去焦点
    onBlur(row) {
      this.clickRowIndex = null;
      this.clickField = null;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 1) {
      //   // debugger;
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 1,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
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
      if (!this.isView && rowIndex >= 0 && columnIndex > 4) {
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
