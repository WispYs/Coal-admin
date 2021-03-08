<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="违章违纪事实、检查部门、责任人"
          suffix-icon="el-icon-search"
        />
      </div>
      <div class="filter-bar__item">
        <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      fit
      :cell-style="cellStyle"
      header-cell-class-name="pre-line"
    >
      <el-table-column align="center" label="序号" width="95" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="checkOrganization" align="center" label="检查部门" width="140" />
      <el-table-column prop="person" align="center" label="检查人员" width="90" />
      <el-table-column prop="classes" align="center" label="检查班次" width="140" />
      <el-table-column prop="checkDate" align="center" label="检查时间" width="140" />
      <el-table-column prop="dutyOrganization" align="center" label="责任单位" width="120" />
      <el-table-column prop="level" align="center" label="严重级别" width="140">
        <template slot-scope="scope">
          <span class="color-lump green">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" align="center" label="备注" width="140" />
      <el-table-column prop="proMan" align="center" label="违章人员" width="90" />
      <el-table-column prop="violation" align="center" label="违章违纪" width="180" />
      <el-table-column prop="result" align="center" label="处理结果" width="90" />
      <el-table-column prop="yearViolations" align="center" label="年度三违" />
      <el-table-column prop="deduct" align="center" label="违章扣分" />
      <el-table-column prop="files" align="center" label="附件" />
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <el-button type="text" size="small" @click="edit()">编辑</el-button>
        <el-button type="text" size="small" style="color: #f56c6c" @click="del()">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: '',
      tableData: [
        {
          level: '一般',
          status: '待修复',
          checkDate: '2021.01.27',
          classes: '',
          checkType: '',
          remark: '',
          checkOrganization: '掘进五区区直',
          dutyOrganization: '',
          person: '徐长春',
          accompanyPerson: '',
          proMan: '',
          violation: '1163（3）轨顺',
          yearViolations: '',
          result: '',
          changeDate: '2021.01.31',
          statusExplain: '',
          review: '',
          content: '',
          deduct: '',
          files: ''
        }
      ]
    }
  },
  methods: {
    search() {
      console.log(this.keywords)
    },
    edit() {
      console.log('edit')
    },
    del() {
      console.log('del')
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
  .color-lump {
    padding: 10px 20px;
    color: $whiteColor;
    &.green {
      background: $greenColor;
    }
    &.blue {
      background: $primaryColor;
    }
    &.orange {
      background: $orangeColor;
    }
    &.red {
      background: $redColor;
    }
  }
</style>
