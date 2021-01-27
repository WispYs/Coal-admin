<template>
  <div class="page-container mult-table">

    <el-table
      id="mult-table"
      v-loading="listLoading"
      :data="list"
      :header-cell-class-name="headerCellClassName"
    >
      <el-table-column
        prop="team"
        width="100"
      />
      <el-table-column
        prop="addr"
        label="工作地点"
        width="120"
      />
      <el-table-column label="第一班" align="center">
        <el-table-column
          prop="groups[0].monitor"
          label="跟班班长"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[0].count"
          label="出勤人数"
          width="80"
          align="center"
        />
        <el-table-column
          prop="groups[0].workload"
          label="当班工作量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[0].workplan"
          label="当日计划"
          width="80"
          align="center"
        />
      </el-table-column>
      <el-table-column label="第二班" align="center">
        <el-table-column
          prop="groups[1].monitor"
          label="跟班班长"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[1].count"
          label="出勤人数"
          width="80"
          align="center"
        />
        <el-table-column
          prop="groups[1].workload"
          label="当班工作量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[1].workplan"
          label="当日计划"
          width="80"
          align="center"
        />
      </el-table-column>
      <el-table-column label="第三班" align="center">
        <el-table-column
          prop="groups[2].monitor"
          label="跟班班长"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[2].count"
          label="出勤人数"
          width="80"
          align="center"
        />
        <el-table-column
          prop="groups[2].workload"
          label="当班工作量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="groups[2].workplan"
          label="当日计划"
          width="80"
          align="center"
        />
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import { getMultList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  mounted() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      getMultList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    // 单元格的style回调方法
    headerCellClassName(row) {
      if (row.rowIndex === 0 && row.columnIndex === 0) {
        return 'th-slash'
      }
    }
  }
}
</script>
<style lang="scss">
  .mult-table {
    width: 1340px;
    padding-top: 40px;
    margin: 0 auto;
    .el-table {
      .th-slash {
        position: relative;

        .cell {
          position: absolute;
          top: 0;
          left: 0;
          width: 141px;   // 根据勾股定理计算得出长度和旋转角度
          height: 1px;
          background-color: #EBEEF5;
          display: block;
          text-align: center;
          transform: rotate(43deg);
          transform-origin: top left;
          -ms-transform: rotate(43deg);
          -ms-transform-origin: top left;
          -webkit-transform: rotate(43deg);
          -webkit-transform-origin: top left;
        }
        &:before {
          content: '单位';
          position: absolute;
          left: 0;
          bottom: 15px; // padding-top + 行高差值/2    12 + (22 - 16)/2
          width: 50px;
          text-align: center;
        }
        &:after {
          content: '项目';
          position: absolute;
          right: 0;
          top: 15px;
          width: 50px;
          text-align: center;
        }
      }
    }

  }
</style>
