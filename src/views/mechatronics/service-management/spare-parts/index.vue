<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>所属场所：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="请输入所属场所"
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
      <el-table-column prop="site" align="center" label="所属场所" />
      <el-table-column prop="name" align="center" label="备品备件名称" width="110px" />
      <el-table-column prop="model" align="center" label="规格型号" width="150px" />
      <el-table-column prop="unit" align="center" label="计量单位" />
      <el-table-column prop="addr" align="center" label="使用地点" />
      <el-table-column prop="storage" align="center" label="存放位置" />
      <el-table-column prop="currentNum" align="center" label="当前数量" />
      <el-table-column prop="alarmNum" align="center" label="预警数量" />
      <el-table-column prop="remark" align="center" label="备注" />

      <el-table-column prop="person" align="center" label="责任人" />
      <el-table-column prop="updatePerson" align="center" label="更新人" />
      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="scope">
          <span class="color-lump blue">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200" align="center">
        <el-button type="text" size="small" @click="edit()">领用</el-button>
        <el-button type="text" size="small" @click="edit()">入库</el-button>
        <el-button type="text" size="small" @click="edit()">明细</el-button>
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
          site: '副井',
          name: '交流接触器',
          model: 'CJX2-65(65A、380V)',
          unit: '',
          addr: '',
          storage: '1#柜',
          currentNum: 5,
          alarmNum: 3,
          person: '超级管理员',
          updatePerson: '超级管理员',
          status: '正常',
          remark: ''
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
