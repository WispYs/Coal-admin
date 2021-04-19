<template>
  <div class="page-container">
    <filter-bar :config="FilterConfig" @search-click="queryData" @create-click="openDialog('create')" @reset-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="OTableConfig" @load-tree-data="asyncData" @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick" @submit-data="editSubmit" />
    <div v-show="total > 0" class="page-bottom">
      <!-- <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteClick">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button> -->
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog ref="createDialog" :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />
  </div>
</template>

<script>
  import {
    getRiskOrganization,
    getRiskOrganizationSelect,
    saveAqglRiskTissue,
    updateAqglRiskTissue,
    deleteAqglRiskTissue,
    getRiskTissueChildTree,
    getAqglRiskTissueById
  } from '@/api/organization'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import {
    FilterConfig,OTableConfig
  } from '@/data/organization'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog
    },
    data() {
      return {
        id: 'organization',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          pagerows: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        FilterConfig,
        OTableConfig,
        deleteDisabled: true,
        createDialogVisible: false,
        editDialogVisible: false
      }
    },
    created() {
      this.__fetchData()
    },
    methods: {
      __fetchData(_filter) {
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          entity: {
            aqglRiskTissueName: _filter,
            parentId: 0
          },
          sort: {
            asc: ["orderNum"]
          }
        }
        getRiskOrganization(query).then(response => {
          response.data.rows.forEach(it => {
            it.aqglRiskTissueId = Number(it.aqglRiskTissueId)
            if (it.parentCheck === 1) {
              it.hasChildren = true
            }
          })
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        })
      },
      asyncData(tree, treeNode, resolve){
        getRiskTissueChildTree(tree.aqglRiskTissueId).then(response => {
          const childrenTree = []
          response.data.forEach(it => {
            const item = {
              aqglRiskTissueName: it.aqglRiskTissueName,
              aqglRiskTissueId: Number(it.aqglRiskTissueId),
              createTime: it.createTime,
              orderNum: it.orderNum,
              parentId: it.parentId,
              remark: it.remark,
              hasChildren: it.parentCheck === 1
            }
            childrenTree.push(item)
          })
          resolve(childrenTree)
        })
      },
      // 查询数据
      queryData(filter) {
        this.__fetchData(filter.name)
      },
      pagination(data){
        this.listQuery.page = data.page
        this.listQuery.pagerows = data.pagerows
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '800px',
          form: this.OTableConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '800px',
          form: this.OTableConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        this.updateTableConfig()
        if (row) {
          getAqglRiskTissueById(row.aqglRiskTissueId).then(response => {
            const info = Object.assign(response.data, {
              parentId: Number(response.data.parentId) || 0
            })
            this.$refs.editDialog.updataForm(info)
          })
        }
      },
      updateTableConfig() {
        let query = {
          aqglRiskTissueId:''
        }
        getRiskOrganizationSelect().then(response => {
          this.OTableConfig.columns.forEach(it => {
            if (it.field === 'parentId') {
              it.options = response.data
            }
          })
        })
      },
      // 删除
      deleteClick(row) {
        this.$confirm('确定删除该组织结构?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAqglRiskTissue(row.aqglRiskTissueId).then(response => {
            this.$message.success('删除成功')
            this.__fetchData()
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        if(!submitData.parentId){
          submitData.parentId = 0
        }
        const query = Object.assign(submitData, {
          orderNum: Number(submitData.orderNum) || 0
        })
        saveAqglRiskTissue(query).then(response => {
          this.__fetchData()
          this.$refs.createDialog.resetForm()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        })
      },
      editSubmit(submitData) {
        if(!submitData.parentId){
          submitData.parentId = 0
        }
        const query = Object.assign(submitData, {
          orderNum: Number(submitData.orderNum) || 0
        })
        updateAqglRiskTissue(submitData).then(response => {
          this.__fetchData()
          this.$refs.editDialog.resetForm()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        })
      }
    }
  }
</script>
