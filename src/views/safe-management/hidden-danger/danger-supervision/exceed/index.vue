<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="隐患内容、整改意见"
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

      <el-table-column prop="status" align="center" label="隐患状态" width="160">
        <template slot-scope="scope">
          <span class="color-lump blue">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkDate" align="center" label="检查时间" width="140" />
      <el-table-column prop="classes" align="center" label="检查班次" width="140" />
      <el-table-column prop="checkType" align="center" label="检查类别" width="140" />
      <el-table-column prop="checkOrganization" align="center" label="检查单位" width="140" />
      <el-table-column prop="person" align="center" label="检查人员" width="90" />
      <el-table-column prop="accompanyPerson" align="center" label="陪同人员" width="90" />
      <el-table-column prop="organization" align="center" label="隐患部门" width="160" />
      <el-table-column prop="proMan" align="center" label="责任人员" width="90" />
      <el-table-column prop="addr" align="center" label="检查地点" width="180" />
      <el-table-column prop="dangerType" align="center" label="隐患类别" width="90" />
      <el-table-column prop="level" align="center" label="隐患级别" width="160">
        <template slot-scope="scope">
          <span class="color-lump orange">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="changeDate" align="center" label="限改时间" width="140" />
      <el-table-column prop="statusExplain" align="center" label="状态说明" />
      <el-table-column prop="review" align="center" label="复查单位" />
      <el-table-column prop="content" align="center" label="隐患内容" />
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
          level: '一般隐患C',
          status: '待修复',
          checkDate: '2021.01.27',
          classes: '',
          checkType: '',
          checkOrganization: '掘进五区区直',
          person: '徐长春',
          accompanyPerson: '',
          proMan: '',
          addr: '1163（3）轨顺',
          dangerType: '',
          changeDate: '2021.01.31',
          statusExplain: '',
          review: '',
          content: '',
          measure: '',
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
