<template>
  <div class="page-container">
    <div class="filter-bar">
      <div class="filter-bar__item">
        <label>关键字：</label>
        <el-input
          v-model="keywords"
          class="filter-item"
          style="width:200px"
          placeholder="所属场所、检修位置"
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
      <el-table-column prop="supplier" align="center" label="供应商" width="150px" />
      <el-table-column prop="phone" align="center" label="联系电话" />
      <el-table-column prop="addr" align="center" label="地址" />
      <el-table-column prop="postcode" align="center" label="邮编" />
      <el-table-column prop="fax" align="center" label="传真" />
      <el-table-column prop="url" align="center" label="网址" />
      <el-table-column prop="person" align="center" label="联系人" />
      <el-table-column prop="position" align="center" label="联系人职务" />
      <el-table-column prop="personPhone" align="center" label="联系人电话" />
      <el-table-column prop="personMobile" align="center" label="联系人手机" />
      <el-table-column prop="personEmail" align="center" label="联系人邮箱" />
      <el-table-column prop="remark" align="center" label="备注" />
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
          supplier: '安徽三正',
          phone: '',
          addr: '',
          postcode: '',
          fax: '',
          url: '',
          person: '',
          position: '',
          personPhone: '',
          personMobile: '',
          personEmail: '',
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
