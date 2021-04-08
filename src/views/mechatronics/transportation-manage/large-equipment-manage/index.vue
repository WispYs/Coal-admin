<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="设备编号、设备名称"
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
      <el-table-column prop="id" align="center" label="设备编号" width="200" />
      <el-table-column prop="name" align="center" label="设备名称" />
      <el-table-column prop="site" align="center" label="所属场所" />
      <el-table-column prop="equipment" align="center" label="所属部件" />
      <el-table-column prop="model" align="center" label="规格型号" />
      <el-table-column prop="manufacturers" align="center" label="生产厂家" />
      <el-table-column prop="uid" align="center" label="资产编号" />
      <el-table-column prop="productDate" align="center" label="出厂日期" />
      <el-table-column prop="deliveryDate" align="center" label="到货日期" />
      <el-table-column prop="serviceDate" align="center" label="使用日期" />
      <el-table-column prop="qrCode" align="center" label="二维码" />
      <el-table-column prop="file" align="center" label="附件" />
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
          id: 'GQ0100003',
          name: '落地式提升机',
          site: '提升机房',
          equipment: '提升机',
          model: 'JKMD5*4',
          manufacturers: '中信重工',
          uid: '01110313',
          productDate: '2021.01.02',
          deliveryDate: '2021.02.02',
          serviceDate: '2021.02.04',
          qrCode: '',
          file: ''
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
