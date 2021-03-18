<!--风桥管理台账-->
<template>
  <div class="page-container report-table">
    <h2 class="title">顾桥矿（中央区）风桥管理台账</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="项目" align="center" width="150">
        <el-table-column prop="dw" label="单位" width="120"> </el-table-column>
      </el-table-column>

      <el-table-column label="编号" prop="no" align="center" />
      <el-table-column label="时间" prop="time" align="center" />
      <el-table-column label="地点" prop="addr" align="center" />
      <el-table-column
        label="风桥断面是否大于原巷道的4/5"
        prop="fqdmsfdyyxd"
        align="center"
      />
      <el-table-column label="坡度" prop="pd" align="center" />
      <el-table-column
        label="是否用混凝土浇灌"
        prop="sfyhntjg"
        align="center"
      />
      <el-table-column label="是否漏风" prop="sflf" align="center" />
      <el-table-column
        label="是否安设有风门、风窗"
        prop="sfasyfm"
        align="center"
      />
      <el-table-column
        label="四周是否实帮实底"
        prop="szsfsbsd"
        align="center"
      />
      <el-table-column label="检查人" prop="jcr" align="center" />
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
          no: "2",
          time: "2012-02-02",
          addr: "dd",
          fqdmsfdyyxd: "第一班",
          pd: "",
          sfyhntjg: "",
          sflf: "",
          jsfasyfmj: "",
          szsfsbsd: "",
          jcr: ""
        },
        {
          layout: "Text",
          editable: [],
          no: "5",
          time: "2012-02-02",
          addr: "eee",
          fqdmsfdyyxd: "第一班",
          pd: "",
          sfyhntjg: "",
          sflf: "",
          jsfasyfmj: "",
          szsfsbsd: "",
          jcr: ""
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
