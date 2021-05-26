<template>
  <div class="page-container report-table">
    <h2 class="title">回采工作面区队长汇报记录</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="项目" align="right" width="150">
        <el-table-column prop="dw" label="单位" width="120"> </el-table-column>
      </el-table-column>

      <el-table-column prop="gzmmc" label="工作面名称">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gzmmc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gzmmc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gzmmc }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="gzmxz" label="工作面性质">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gzmxz')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gzmxz"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gzmxz }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="bc" label="班次">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'bc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.bc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.bc }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="gzjh" label="工作计划">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gzjh')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gzjh"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gzjh }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="gbdz" label="跟班队长">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gbdz')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gbdz"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gbdz }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="cqrs" label="出勤人数">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'cqrs')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.cqrs"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.cqrs }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="pjcg" label="平均采高（米）">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'pjcg')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.pjcg"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.pjcg }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(item, index) of mechanism"
        :label="item"
        align="center"
        :key="item"
        width="120"
      >
        <el-table-column label="机头" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.mechanism[index].frequency }}
          </template>
        </el-table-column>
        <el-table-column label="机尾" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.mechanism[index].cost }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column prop="gzmsjcd" label="工作面设计长度（米）">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'gzmsjcd')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.gzmsjcd"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.gzmsjcd }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="sycd" label="剩余长度（米）">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'sycd')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.sycd"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.sycd }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="dbgzl" label="当班工作量">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'dbgzl')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.dbgzl"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.dbgzl }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="myqk" label="煤岩情况">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'myqk')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.myqk"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.myqk }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickRowIndex: null, // 点击单元格的行序号
      clickField: null, // 点击单元格的字段
      mechanism: ["当日推进度（米）", "月累计推进度（米）", "累计推进度（米）"],
      tableData: [
        {
          layout: "Text",
          editable: [
            "dw",
            "gzmmc",
            "bc",
            "gzjh",
            "gbdz",
            "cqrs",
            "pjcg",
            "dbgzl",
            "myqk"
          ],
          dw: "项目A",
          gzmmc: "1126工作面",
          gzmxz: "煤采",
          bc: "第一班",
          gzjh: "",
          gbdz: "",
          cqrs: "",
          pjcg: "",
          sycd: "",
          dbgzl: "",
          myqk: "",
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            }
          ]
        },
        {
          layout: "Text",
          editable: [
            "dw",
            "gzmmc",
            "bc",
            "gzjh",
            "gbdz",
            "cqrs",
            "pjcg",
            "dbgzl",
            "myqk"
          ],
          dw: "项目A",
          gzmmc: "1126工作面",
          gzmxz: "煤采",
          bc: "第一班",
          gzjh: "",
          gbdz: "",
          cqrs: "",
          pjcg: "",
          sycd: "",
          dbgzl: "",
          myqk: "",
          dw: "项目B",
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        }
      ]
    };
  },
  methods: {
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
    cell({ row, column, rowIndex, columnIndex }) {
      return "bacColorf3d7ab";
      // if (rowIndex > 0 && columnIndex > 0) {
      //   return "bacColorf3d7ab";
      // } else if (rowIndex === 6 && columnIndex === 4) {
      //   return "bacColorf4984e";
      // } else if (rowIndex === 6 && columnIndex === 5) {
      //   return "bacColor317eb0";
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table thead.is-group th {
  background: none;
}
::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type {
  border-bottom: none;
}
::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type:before {
  content: "";
  position: absolute;
  width: 1px;
  height: 80px; /*这里需要自己调整，根据td的宽度和高度*/
  top: 0;
  left: 0;
  background-color: grey;
  opacity: 0.3;
  display: block;
  transform: rotate(-52deg); /*这里需要自己调整，根据线的位置*/
  transform-origin: top;
}
::v-deep .el-table thead.is-group tr:last-of-type th:first-of-type:before {
  content: "";
  position: absolute;
  width: 1px;
  height: 80px; /*这里需要自己调整，根据td的宽度和高度*/
  bottom: 0;
  right: 0;
  background-color: grey;
  opacity: 0.3;
  display: block;
  transform: rotate(-52deg); /*这里需要自己调整，根据线的位置*/
  transform-origin: bottom;
  // background:red;
}
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
