<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="请输入设备类型、使用地点"
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
      <el-table-column prop="name" align="center" label="设备类型" width="100px" />
      <el-table-column prop="model" align="center" label="规格型号" width="110px" />
      <el-table-column prop="assetNum" align="center" label="固定资产编号" width="110px" />
      <el-table-column prop="code" align="center" label="内部编码" />
      <el-table-column prop="supplier" align="center" label="生产厂家" />
      <el-table-column prop="productDate" align="center" label="出厂日期" width="100px" />
      <el-table-column prop="useDate" align="center" label="领用日期" width="100px" />
      <el-table-column prop="drawPerson" align="center" label="领料人" />
      <el-table-column prop="oraganization" align="center" label="使用单位" />
      <el-table-column prop="addr" align="center" label="使用地点" />
      <el-table-column prop="unit" align="center" label="计量单位" />
      <el-table-column prop="remark" align="center" label="备注" />
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <el-button type="text" size="small" @click="edit()">回收</el-button>
        <el-button type="text" size="small" @click="edit()">查交</el-button>
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
          name: '带式输送机',
          model: '5TJ-800/2*40',
          assetNum: '0000671003',
          code: 'ZL98457',
          supplier: '无铭牌',
          productDate: '2017-08-12',
          useDate: '2019-01-21',
          drawPerson: '杜飞',
          oraganization: '掘进一区',
          addr: '1125(3)运顺',
          unit: '台',
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
</style>
