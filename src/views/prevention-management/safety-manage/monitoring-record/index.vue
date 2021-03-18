<!--监控传感器校验记录-->
<template>
  <div class="page-container report-table">
    <h2 class="title">模拟量报警信息</h2>

    <el-table
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
      @cell-dblclick="cellDbClick"
      :cell-style="cellStyle"
    >
      <el-table-column prop="mkmc" label="煤矿名称">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'mkmc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.mkmc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.mkmc }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="cgqbh" label="传感器编号">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'cgqbh')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.cgqbh"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.cgqbh }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="lx" label="类型">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'lx')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.lx"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.lx }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="dd" label="地点">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'dd')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.dd"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.dd }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="jsskz" label="结束时刻值">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'jsskz')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.jsskz"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.jsskz }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'status')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.status"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.status }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="ysdx" label="疑似调校">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'ysdx')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.ysdx"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.ysdx }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="kdyc" label="馈电异常">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'kdyc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.kdyc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.kdyc }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="bjkssj" label="报警开始时间">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'bjkssj')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.bjkssj"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.bjkssj }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="bjjssj" label="报警结束时间">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'bjjssj')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.bjjssj"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.bjjssj }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="cxsc" label="持续时长">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'cxsc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.cxsc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.cxsc }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="max" label="最大值">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'max')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.max"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.max }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="zdzsk" label="最大值时刻">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'zdzsk')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.zdzsk"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.zdzsk }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="min" label="最小值">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'min')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.min"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.min }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="zxzsk" label="最小值时刻">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'zxzsk')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.zxzsk"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.zxzsk }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="sqp" label="申请票">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'sqp')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.sqp"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.sqp }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="dbtz" label="督办通知">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'dbtz')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.dbtz"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.dbtz }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="sfxc" label="是否续传">
        <template slot-scope="scope">
          <template v-if="editCurrentCell(scope.row, 'sfxc')">
            <el-input
              v-if="scope.row.layout === 'Text'"
              v-model="scope.row.sfxc"
              :placeholder="scope.row.placeholder"
              size="small"
              @blur="onBlur(scope.row)"
            />
          </template>
          <template v-else>
            <span>{{ scope.row.sfxc }}</span>
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
      tableData: [
        {
          layout: "Text",
          editable: [
            "mkmc",
            "cgqbh",
            "lx",
            "dd",
            "jsskz",
            "status",
            "ysdx",
            "kdyc",
            "bjkssj",
            "bjjssj",
            "cxsc",
            "max",
            "zdzsk",
            "min",
            "zxzsk",
            "sqp",
            "dbtz",
            "sfxc"
          ],
          mkmc: "顾桥中区",
          cgqbh: "0000146A24",
          lx: "一氧化碳",
          dd: "南三13槽采区回风CO",
          jsskz: "23",
          status: "报警",
          ysdx: "",
          kdyc: "",
          bjkssj: "2020-09-10 04:21:43",
          bjjssj: "2020-09-10 04:25:39",
          cxsc: "3分56秒",
          max: "36",
          zdzsk: "2020-09-10 04:22:48",
          min: "23",
          zxzsk: "2020-09-10 04:25:39",
          sqp: "",
          dbtz: "",
          sfxc: ""
        },
        {
          layout: "Text",
          editable: [
            "mkmc",
            "cgqbh",
            "lx",
            "dd",
            "jsskz",
            "status",
            "ysdx",
            "kdyc",
            "bjkssj",
            "bjjssj",
            ,
            "cxsc",
            "max",
            "zdzsk",
            "min",
            "zxzsk",
            "sqp",
            "dbtz",
            "sfxc"
          ],
          mkmc: "顾桥中区",
          cgqbh: "0000146A24",
          lx: "一氧化碳",
          dd: "南三13槽采区回风CO",
          jsskz: "23",
          status: "报警",
          ysdx: "",
          kdyc: "",
          bjkssj: "2020-09-10 04:21:43",
          bjjssj: "2020-09-10 04:25:39",
          cxsc: "3分56秒",
          max: "36",
          zdzsk: "2020-09-10 04:22:48",
          min: "23",
          zxzsk: "2020-09-10 04:25:39",
          sqp: "",
          dbtz: "",
          sfxc: ""
        },
        {
          layout: "Text",
          editable: [
            "mkmc",
            "cgqbh",
            "lx",
            "dd",
            "jsskz",
            "status",
            "ysdx",
            "kdyc",
            "bjkssj",
            "bjjssj",
            ,
            "cxsc",
            "max",
            "zdzsk",
            "min",
            "zxzsk",
            "sqp",
            "dbtz",
            "sfxc"
          ],
          mkmc: "顾桥中区",
          cgqbh: "0000146A24",
          lx: "一氧化碳",
          dd: "南三13槽采区回风CO",
          jsskz: "23",
          status: "报警",
          ysdx: "",
          kdyc: "",
          bjkssj: "2020-09-10 04:21:43",
          bjjssj: "2020-09-10 04:25:39",
          cxsc: "3分56秒",
          max: "36",
          zdzsk: "2020-09-10 04:22:48",
          min: "23",
          zxzsk: "2020-09-10 04:25:39",
          sqp: "",
          dbtz: "",
          sfxc: ""
        },
        {
          layout: "Text",
          editable: [
            "mkmc",
            "cgqbh",
            "lx",
            "dd",
            "jsskz",
            "status",
            "ysdx",
            "kdyc",
            "bjkssj",
            "bjjssj",
            ,
            "cxsc",
            "max",
            "zdzsk",
            "min",
            "zxzsk",
            "sqp",
            "dbtz",
            "sfxc"
          ],
          mkmc: "顾桥中区",
          cgqbh: "0000146A24",
          lx: "一氧化碳",
          dd: "南三13槽采区回风CO",
          jsskz: "23",
          status: "报警",
          ysdx: "",
          kdyc: "",
          bjkssj: "2020-09-10 04:21:43",
          bjjssj: "2020-09-10 04:25:39",
          cxsc: "3分56秒",
          max: "36",
          zdzsk: "2020-09-10 04:22:48",
          min: "23",
          zxzsk: "2020-09-10 04:25:39",
          sqp: "",
          dbtz: "",
          sfxc: ""
        }
      ]
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
