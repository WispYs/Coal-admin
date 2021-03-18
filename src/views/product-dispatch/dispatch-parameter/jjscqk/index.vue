<!--掘进生产情况-->
<template>
  <div class="page-container report-table">
    <h2 class="title">掘进生产情况</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="项目" align="center" width="150">
        <el-table-column prop="dw" label="单位" width="120"> </el-table-column>
      </el-table-column>

      <el-table-column label="班次" prop="bc" align="center" />
      <el-table-column label="工作地点" prop="gzdd" align="center" />
      <el-table-column label="跟班队长" prop="gbdz" align="center" />
      <el-table-column label="工作计划" prop="gzjh" align="center" />
      <el-table-column label="出勤人数" prop="cqrs" align="center" />
      <el-table-column label="当班工作量" prop="dbgzl" align="center" />
      <el-table-column label="架棚量（架）" prop="jpl" align="center" />

      <el-table-column label="进尺（米）" align="center">
        <el-table-column label="计划分解" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.jhfj }}
          </template>
        </el-table-column>
        <el-table-column label="掘进" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.jj }}
          </template>
        </el-table-column>
        <el-table-column label="月累计" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.ylj }}
          </template>
        </el-table-column>
        <el-table-column label="累计" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.lj }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="巷道设计长度（米）"
        prop="xdsjcd"
        align="center"
      />
      <el-table-column label="剩余长度（米）" prop="sycd" align="center" />
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
          editable: [],
          bc: "项目A",
          gzdd: "1126工作面",
          gbdz: "煤采",
          gzjh: "第一班",
          cqrs: "",
          jpl: "",
          jhfj: "",
          jj: "",
          ylj: "",
          lj: "",
          xdsjcd: "",
          sycd: ""
        },
        {
          layout: "Text",
          editable: [],
          bc: "项目B",
          gzdd: "1126工作面",
          gbdz: "煤采",
          gzjh: "第二班",
          cqrs: "",
          jpl: "",
          jhfj: "",
          jj: "",
          ylj: "",
          lj: "",
          xdsjcd: "",
          sycd: ""
        }
      ]
    };
  },
  methods: {}
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
