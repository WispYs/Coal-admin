<template>
  <div class="nest-table">
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="team"
        label="单位"
      />
      <el-table-column
        prop="addr"
        label="工作地点"
      />
      <el-table-column label="配送信息">
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column label="地址">
          <el-table-column
            prop="province"
            label="省份"
            width="120"
          />
          <el-table-column
            prop="city"
            label="市区"
            width="120"
          />
          <el-table-column
            prop="address"
            label="地址"
            width="350"
          />
          <el-table-column
            prop="zip"
            label="邮编"
            width="120"
          />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        team: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        team: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]

    }
  }
}
</script>
<style lang="scss" scoped>
  .nest-table {
    width: 1000px;
    padding-top: 40px;
    margin: 0 auto;
  }
</style>
