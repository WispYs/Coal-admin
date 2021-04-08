<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="请输入设备类型"
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
      <el-table-column prop="productCode" align="center" label="出厂编号" />
      <el-table-column prop="unit" align="center" label="计量单位" />
      <el-table-column prop="specification" align="center" label="设备规格" />
      <el-table-column prop="enterDate" align="center" label="入账时间" width="100px" />
      <el-table-column prop="parameter" align="center" label="技术参数" />
      <el-table-column prop="ageLimit" align="center" label="折旧年限" />
      <el-table-column prop="originalValue" align="center" label="原价" />
      <el-table-column prop="assetType" align="center" label="资产类型" />
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <el-button type="text" size="small" @click="edit()">报废</el-button>
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
          name: '矿用隔爆兼本安型',
          model: 'QJZ-1200/3300-10',
          assetNum: '0032402',
          code: 'ZL98457',
          supplier: '比淮机械',
          productDate: '2017-08-12',
          productCode: 'XJ20347',
          unit: '台',
          specification: '800/2*40',
          enterDate: '2018-12-25',
          parameter: '',
          ageLimit: 30,
          originalValue: '',
          assetType: '自有'
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
