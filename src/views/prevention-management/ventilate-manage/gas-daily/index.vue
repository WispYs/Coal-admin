<!--风桥管理台账-->
<template>
  <div class="page-container report-table">
    <h2 class="title">瓦斯抽采日报表</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="抽采系统" prop="ccxt" align="center" />
      <el-table-column label="泵站名称" prop="bzmc" align="center" />
      <el-table-column label="抽采泵/管路" prop="ccbgl" align="center" />
      <el-table-column label="抽采地点" prop="ccdd" align="center" />
      <el-table-column label="抽采类型" prop="cclx" align="center" />
      <el-table-column label="抽采时间" align="center">
        <el-table-column label="min" prop="ccsj" align="center" />
      </el-table-column>
      <el-table-column label="孔板系数" prop="kbxs" align="center" />
      <el-table-column label="孔板压差" align="center">
        <el-table-column label="mmH2O" prop="mmH2O" align="center" />
      </el-table-column>
      <el-table-column label="瓦斯浓度" align="center">
        <el-table-column label="%" prop="wsnd" align="center" />
      </el-table-column>
      <el-table-column label="大气压力" align="center">
        <el-table-column label="mmHg" prop="dqyl" align="center" />
      </el-table-column>
      <el-table-column label="管道负压" align="center">
        <el-table-column label="kpa" prop="gdfy" align="center" />
      </el-table-column>
      <el-table-column label="气体温度" align="center">
        <el-table-column label="℃" prop="qtwd" align="center" />
      </el-table-column>
      <el-table-column label="混合流量" align="center">
        <el-table-column label="m3/min" prop="hhll" align="center" />
      </el-table-column>
      <el-table-column label="纯流量" align="center">
        <el-table-column label="m3/min" prop="cll" align="center" />
      </el-table-column>
      <el-table-column label="日抽采量" align="center">
        <el-table-column label="m3" prop="rccl" align="center" />
      </el-table-column>
      <el-table-column label="本月累计" align="center">
        <el-table-column label="m3" prop="bylj" align="center" />
      </el-table-column>
      <el-table-column label="抽采分地点累计" align="center">
        <el-table-column label="m3" prop="ccfddlj" align="center" />
      </el-table-column>
      <el-table-column label="抽采地点合茬钻孔数" align="center">
        <el-table-column label="个" prop="ccddhzzks" align="center" />
      </el-table-column>
      <el-table-column
        label="计量类型（自动/人工）"
        prop="jllx"
        align="center"
      />
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
          ccxt: "系统2",
          bzmc: "2012-02-02",
          ccbgl: "dd",
          ccdd: "第一班",
          cclx: "",
          ccsj: "",
          kbxs: "",
          kbyc: "",
          wsnd: "",
          dqyl: "",
          gdfc: "",
          qtwd: "",
          hhll: "",
          cll: "",
          rccl: "",
          bylj: "",
          ccfddlj: "",
          ccddhzks: "",
          jllx: ""
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
</style>
