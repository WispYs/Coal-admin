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
      <el-table-column prop="keywords" align="center" label="事故关键词" width="120" />
      <el-table-column prop="site" align="center" label="所属场所" width="120" />
      <el-table-column prop="date" align="center" label="时间" width="120" />
      <el-table-column prop="phenomenon" align="center" label="故障记录" />
      <el-table-column prop="reason" align="center" label="原因分析" />
      <el-table-column prop="solution" align="center" label="防范措施" />
      <el-table-column prop="file" align="center" label="附件" width="90" />
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
          keywords: '副井更换主电机',
          site: '中央区抽风机房',
          date: '2021.01.21',
          phenomenon: '因副井主电机已连续运行11年，为保证...',
          reason: '不足之处：拆除定子下半部分时没有取...',
          solution: '施工中优点：提前在主轴上标定转子位置',
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
