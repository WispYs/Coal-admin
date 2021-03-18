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
    </div>

    <h2 class="title">2020年 原煤产量月度分解计划表</h2>
    <h4 style="text-align: center;">单位：日产：吨，月产(全年合计)：万吨</h4>

    <el-table
      show-summary
      :span-method="objectSpanMethod"
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
      @cell-dblclick="cellDbClick"
      :cell-style="cellStyle"
    >
      <el-table-column prop="db" label="队别">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'db', [3, 4, 5])">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.db"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.db }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="gzm" label="工作面">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gzm', [3, 4, 5, 7, 8])">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gzm"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gzm }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="startTime" label="开始时间">
        <template slot-scope="scope">
          <template
            v-if="editCurrentCell(scope.row, 'startTime', [3, 4, 5, 7, 8])"
          >
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
          <template
            v-if="editCurrentCell(scope.row, 'endTime', [3, 4, 5, 7, 8])"
          >
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

      <el-table-column label="1月份">
        <el-table-column prop="_1dayYield" label="日产">
          <template slot-scope="scope">
            <template
              v-if="editCurrentCell(scope.row, '_1dayYield', [3, 4, 5, 7, 8])"
            >
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row._1dayYield"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row._1dayYield }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="_1monthYield" label="月产">
          <template slot-scope="scope">
            <template
              v-if="editCurrentCell(scope.row, '_1monthYield', [3, 4, 5, 7, 8])"
            >
              <el-input
                v-if="scope.row.layout === 'Text'"
                v-model="scope.row._1monthYield"
                :placeholder="scope.row.placeholder"
                size="small"
                @blur="onBlur(scope.row)"
              />
            </template>
            <template v-else>
              <span>{{ scope.row._1monthYield }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="2月份">
        <el-table-column prop="_2dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_2monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="3月份">
        <el-table-column prop="_3dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_3monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="4月份">
        <el-table-column prop="_4dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_4monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="5月份">
        <el-table-column prop="_5dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_5monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="6月份">
        <el-table-column prop="_6dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_6monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="7月份">
        <el-table-column prop="_7dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_7monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="8月份">
        <el-table-column prop="_8dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_8monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="9月份">
        <el-table-column prop="_9dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_9monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="10月份">
        <el-table-column prop="_10dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_10monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="11月份">
        <el-table-column prop="_11dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_11monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="12月份">
        <el-table-column prop="_12dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_12monthYield" label="月产"> </el-table-column>
      </el-table-column>

      <el-table-column prop="yearAll" label="全年合计"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TableUtils } from "@/utils/tableUtils";
export default {
  // name: "工作面接续年计划表",
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
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "矿井产量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "回采产量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "掘进煤量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采一队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采一队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采二队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采二队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采三队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "综采三队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "掘进煤(含其他煤)",
          gzm: "",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          layout: "Text",
          editable: [
            "db",
            "gzm",
            "startTime",
            "endTime",
            "_1dayYield",
            "_1monthYield"
          ],
          db: "说明",
          gzm: "",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1monthYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        }
      ]
    };
  },
  created() {
    TableUtils.getSpanArr(this.tableData);
  },
  mounted() {
    // console.log(this.tableData.length);
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 10 === 0 || rowIndex % 9 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }

      if (columnIndex === 0) {
        const _row = TableUtils.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (2 < rowIndex && columnIndex < 6) {
        return "bacColorf3d7ab";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
