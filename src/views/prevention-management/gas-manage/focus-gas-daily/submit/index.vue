<!--重点瓦斯日报表-->
<template>
  <div class="page-container report-table">
    <div class="top">
      <span class="data-picker"
        >所属矿区：<el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></span>
      <!-- <el-button size="mini" type="primary">同步上一月计划</el-button> -->
    </div>
    <h2 class="title">重点瓦斯日报表</h2>

    <el-table class="table-row" :data="tableData" style="width: 100%">
      <el-table-column prop="db" label="队别" />

      <el-table-column prop="addr" label="地点" />

      <el-table-column label="瓦斯浓度">
        <el-table-column label="工作面">
          <el-table-column prop="min" label="最小" />
          <el-table-column prop="max" label="最大" />
          <el-table-column prop="zpj" label="周平均" />
        </el-table-column>
        <el-table-column label="回风">
          <el-table-column prop="min" label="最小" />
          <el-table-column prop="max" label="最大" />
          <el-table-column prop="zpj" label="周平均" />
        </el-table-column>
        <el-table-column label="上隅角">
          <el-table-column prop="min" label="最小" />
          <el-table-column prop="max" label="最大" />
        </el-table-column>
      </el-table-column>

      <el-table-column label="回风流">
        <el-table-column label="风量">
          <el-table-column prop="m3/min" label="m3/min" />
        </el-table-column>
        <el-table-column label="温度">
          <el-table-column prop="℃" label="℃" />
        </el-table-column>
      </el-table-column>

      <el-table-column label="瓦斯超限">
        <el-table-column label="累计时间">
          <el-table-column prop="min" label="min" />
        </el-table-column>
        <el-table-column prop="yy" label="原因" />
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
          editable: [],
          db: "顾桥中区",
          addr: "0000146A24",
          min: "",
          max: "",
          zpj: "2020-09-10 04:21:43",
          fl: "2020-09-10 04:25:39",
          wd: "3分56秒",
          ljsj: "36",
          yy: "2020-09-10 04:22:48"
        },
        {
          layout: "Text",
          editable: [],
          db: "顾桥中区",
          addr: "0000146A24",
          min: "",
          max: "",
          zpj: "2020-09-10 04:21:43",
          fl: "2020-09-10 04:25:39",
          wd: "3分56秒",
          ljsj: "36",
          yy: "2020-09-10 04:22:48"
        }
      ],
      value: "2",
      options: [
        {
          value: "1",
          label: "顾桥矿(南区)"
        },
        {
          value: "2",
          label: "顾桥矿(东区)"
        },
        {
          value: "3",
          label: "顾桥矿(中央区)"
        }
      ]
    };
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
