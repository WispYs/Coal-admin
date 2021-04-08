<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>证书编号：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="请输入证书编号"
          suffix-icon="el-icon-search"
        />
      </div>
      <div class="filter-bar__item">
        <label>证书类型：</label>
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="filter-bar__item">
        <el-button type="primary" size="medium" @click="search()">搜索</el-button>
        <el-button type="primary" size="medium" @click="search()"><i class="el-icon-plus el-icon--left" />创建</el-button>
        <el-button size="medium" plain @click="search()"><i class="el-icon-refresh el-icon--left" />同步</el-button>
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
      <el-table-column prop="code" align="center" label="证书编号" />
      <el-table-column prop="type" align="center" label="证书类型" />
      <el-table-column prop="remark" align="center" label="备注" />
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
      type: '',
      options: [{
        value: 1,
        label: '防爆证'
      }, {
        value: 2,
        label: '煤安证'
      }],
      tableData: [
        {
          code: 'CNE07.0338',
          type: '防爆证',
          file: '',
          remark: '机电防爆证测试'
        }, {
          code: 'MA1020002',
          type: '煤安证',
          file: '',
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
