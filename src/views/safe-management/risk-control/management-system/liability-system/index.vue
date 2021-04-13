<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick"/>
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="FilterConfig" @search-click="queryData" @create-click="openDialog('create')" @reset-click="queryData" />
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="TableConfig" @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick" @submit-data="editSubmit" />
      <div v-show="total > 0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteClick">
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination v-show="total >0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
          @pagination="pagination" />
      </div>

    </div>

    <!-- 新建弹窗 -->
    <form-dialog :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />

  </div>
</template>

<script>
  import {
    aqglRiskSystemList,
    saveAqglRiskSystem,
    deleteAqglRiskTissue,
    updateAqglRiskSystem
  } from '@/api/liability-system'
  import {
    getRiskOrganizationSelect
  } from '@/api/organization'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import TreeBar from '@/components/TreeBar'
  import {
    TableConfig,
    FilterConfig
  } from '@/data/liability-system'

  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      TreeBar
    },
    data() {
      return {
        id: 'liability-system',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          pagerows: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        FilterConfig,
        TableConfig,
        createDialogVisible: false,
        editDialogVisible: false,
        treeExtend: true,
        treeData: {
          title: '风险组织结构',
          list: []
        },
        riskFilterList: [],
        deleteDisabled: true
      }
    },
    created() {
      this.__fetchData()
      this.__getRiskSystemTree()
    },
    methods: {
      __getRiskSystemTree() {
        getRiskOrganizationSelect().then(response => {
          console.log(response.data);
          this.treeData.list = response.data
          TableConfig.columns.forEach(it => {
            if (it.field === 'aqglRiskTissueId') {
              it.options = response.data
            }
          })
        })
      },
      __fetchData(_filter,id) {
        console.log(_filter);
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          entity: {
            aqglRiskTissueId: id
          },
          keyword: _filter,
          keywordField:['riskName','position']
        }
        aqglRiskSystemList(query).then(response => {
          console.log(response);
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        })
      },
      // 查询数据
      queryData(filter) {
        this.__fetchData(filter.name)
      },
      // 根据组织机构查询组织机构下面的风险责任体系
      handleNodeClick(_data) {
        this.__fetchData('',_data.value)
        this.$message.success('查询成功')
      },
      pagination(row){
        this.listQuery.page = row.page
        this.listQuery.pagerows = row.pagerows
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '500px',
          form: this.riskFilterList
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '500px',
          form: this.riskFilterList
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        this.riskFilterList = this.TableConfig.columns.filter((ele, index, arr) => {
          return !!ele.field.indexOf("createTime")
        })
        if (row) {
          console.log(row);
          const rowObj = Object.assign(row, {
            aqglRiskTissueId: Number(row.aqglRiskTissueId)
          })
          // 如果有数据，更新子组件的 formData
          this.$refs.editDialog.updataForm(row)
        }
      },
      // 删除
      deleteClick(data) {
        this.$confirm('确定删除该条风险?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAqglRiskTissue(data.aqglRiskSystemId).then(response => {
            console.log(response);
            this.__fetchData()
            this.$message.success('删除成功')
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        saveAqglRiskSystem(submitData).then(response => {
          // this.$refs.createDialog.resetForm()
          this.__fetchData()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        })
      },
      editSubmit(submitData) {
        console.log(submitData)
        updateAqglRiskSystem(submitData).then(response =>{
          console.log(response);
          this.__fetchData()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        })
      }

    }
  }
</script>
