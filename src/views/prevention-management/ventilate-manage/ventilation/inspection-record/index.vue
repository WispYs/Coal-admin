<!--通风设施验收记录-->
<template>
  <div class="page-container report-table">
    <h2 class="title">顾桥矿（中央区）通风设施（3）月份管理台帐</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" prop="no" align="center" />
      <el-table-column label="地点" prop="addr" align="center" />
      <el-table-column label="风门编号" prop="fmbh" align="center" />
      <el-table-column label="类型" prop="type" align="center" />
      <el-table-column label="墙体结构" prop="qtjg" align="center" />
      <el-table-column label="施工日期" prop="sgrq" align="center" />
      <el-table-column label="墙体厚度(米)" prop="qthd" align="center" />
      <el-table-column label="风门尺寸(米)" prop="fmcc" align="center" />
      <el-table-column label="有无风窗" prop="ywfc" align="center" />
      <el-table-column label="风窗尺寸（米）" prop="fccc" align="center" />
      <el-table-column label="备注" prop="note" align="center" />
    </el-table>

    <div class="total-score">
      <b>队长： <span style="margin-left: 40px"></span></b>
      <b>审核： <span style="margin-left: 40px"></span></b>
      <b>制表： <span style="margin-left: 40px"></span></b>
    </div>
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
          no: "系统2",
          addr: "2012-02-02",
          fmbh: "dd",
          type: "第一班",
          qtjg: "",
          sgrq: "",
          qthd: "",
          fmcc: "",
          ywfc: "",
          fccc: "",
          note: "备注"
        }
      ]
    };
  },
  methods: {}
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
.total-score {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  text-align: right;
}
.total-score b {
  border-bottom: 2px solid #000;
}
</style>
