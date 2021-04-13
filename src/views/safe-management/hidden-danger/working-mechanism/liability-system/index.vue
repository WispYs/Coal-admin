<template>
  <div class="page-container">
    <!-- <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" /> -->
    <div class="tree-form-container">
      <div class="filter-bar">
        <div class="filter-bar__item">
          <label>责任人职位：</label>
          <el-input
            v-model="keywords"
            class="filter-item"
            style="width:200px"
            placeholder="请输入责任人职位"
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
        <el-table-column prop="proMan" align="center" label="责任人" width="200" />
        <el-table-column prop="organization" align="center" label="组织" width="200" />
        <el-table-column prop="position" align="center" label="职位" width="200" />
        <el-table-column prop="liability" align="center" label="职责与义务" />
        <el-table-column prop="createData" align="center" label="创建时间" />
        <el-table-column fixed="right" label="操作" width="160" align="center">
          <el-button type="text" size="small" @click="edit()">编辑</el-button>
          <el-button type="text" size="small" style="color: #f56c6c" @click="del()">删除</el-button>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
import { getOrganTree } from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
export default {
  components: { TreeBar },
  data() {
    return {
      keywords: '',
      treeData: {
        title: '',
        list: []
      },
      treeData: {
        title: '',
        list: []
      },
      tableData: [
        {
          proMan: '李翔',
          organization: '安监科',
          position: '副科长',
          liability: '',
          createData: '2021.01.27 16:25'
        }
      ]
    }
  },
  created() {
    // this.__updateOrganTree()
  },
  methods: {
    // 接口获取组织机构树
    __updateOrganTree() {
      getOrganTree().then(response => {
        console.log(response.data)
        // 更新左侧树结构数据
        this.treeData.list = response.data
        // 更新新增、编辑config数据
        // this.MechanismTableConfig.columns.forEach(it => {
        //   if (it.field === 'sysDeptId') {
        //     it.options = response.data
        //   }
        // })
      })
    },
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
    },
    handleNodeClick(){

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
