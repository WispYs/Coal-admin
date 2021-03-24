<template>
  <div class="page-container report-table">
    <div v-if="isShow" class="report-button">
      <el-button
        type="primary"
        size="small"
        @click="exit"
      ><i class="el-icon-close el-icon--left" />退出</el-button>
      <!-- <el-button type="primary" size="small"
        ><i class="el-icon-check el-icon--left" />提交</el-button
      > -->
    </div>

    <div v-show="!isShow">
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="no" label="序号" />
        <el-table-column prop="rateTime" label="评价年月" />
        <el-table-column prop="major" label="专业" />
        <el-table-column prop="score" label="分数" />
        <el-table-column prop="dw" label="单位" />
        <el-table-column prop="lrrq" label="录入日期" />
        <el-table-column prop="lrr" label="录入人" />

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-view"
              @click="view"
            />
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="edit"
            />
            <el-button size="mini" icon="el-icon-delete" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="isShow">
      <Report :is-view="isView" />
    </div>
  </div>
</template>

<script>
import Report from './components/report'
export default {
  components: { Report },
  data() {
    return {
      isShow: false,
      isView: false,
      addr: '',
      multipleSelection: [],
      tableData1: [
        {
          no: '2016-05-03',
          rateTime: '2020.11',
          major: '采煤',
          score: 100,
          dw: '顾桥煤矿',
          lrrq: '2020.11.07',
          lrr: '超级管理员'
        },
        {
          no: '2016-05-03',
          rateTime: '2020.11',
          major: '采煤',
          score: 100,
          dw: '顾桥煤矿',
          lrrq: '2020.11.07',
          lrr: '超级管理员'
        },
        {
          no: '2016-05-03',
          rateTime: '2020.11',
          major: '采煤',
          score: 100,
          dw: '顾桥煤矿',
          lrrq: '2020.11.07',
          lrr: '超级管理员'
        }
      ]
    }
  },
  methods: {
    view() {
      this.isShow = true
      this.isView = true
    },
    edit() {
      this.isShow = true
      this.isView = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看详情表
    exit() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../report.css");
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
</style>
