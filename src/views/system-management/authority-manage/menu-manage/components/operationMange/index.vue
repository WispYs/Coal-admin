<template>
  <div style="height:100%">
    <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog"
      class="detail-dialog">
      <div style="padding: 20px;height: 100%" v-if="dialogVisible">
        <filter-bar :config="config.filter" @search-click="queryData" @create-click="openDialog('createButton')" />
        <list-table :id="id" :list="list" :list-loading="listLoading" :config="config.form"
          @edit-click="(row) => openDialog('editButton', row)" @delete-click="deleteClick"/>
      </div>
    </el-dialog>
    <form-dialog ref="createButtonDialog" :config="initCreateButtonConfig()" :dialog-visible="createButtonDialogVisible"
      @close-dialog="createButtonDialogVisible = false" @submit="createSubmit" />
    <form-dialog ref="editButtonDialog" :config="initEditButtonConfig()" :dialog-visible="editButtonDialogVisible"
      @close-dialog="editButtonDialogVisible = false" @submit="editSubmit" />
  </div>
</template>

<script>
  import {
    findMenuBtnListById,
    saveMenu,
    updateMenu,
    getMenuById,
    deleteMenuById
  } from '@/api/authority-management'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FilterBar from '@/components/FilterBar'
  import FormDialog from '@/components/FormDialog'
  export default {
    components: {
      ListTable,
      Pagination,
      FilterBar,
      FormDialog
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      // 弹窗配置项
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        id: '',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          pagerows: 10
        },
        filter: {}, // 筛选项
        listLoading: false,
        createButtonDialogVisible: false,
        editButtonDialogVisible: false,
        menuId:''
      }
    },
    methods: {
      updata(id){
        this.menuId = id
        this.fetchData()
      },
      fetchData() {
        const query = {
          menuId: this.menuId,
          keyword: this.filter.keyword,
          keywordField: ['menuName']
        }
        findMenuBtnListById(query.menuId).then(response => {
          if (response.data.length > 0) {
            this.listLoading = false
            this.list = response.data
            this.total = Number(response.data.records)
          } else {
            if (this.listQuery.page > 0) {
              this.listQuery.page = this.listQuery.page - 1
              this.__fetchData()
            } else {
              this.listLoading = false
              this.list = []
              this.total = 0
            }
          }
        }).catch(err => {
          this.listLoading = false
        })
      },
      initCreateButtonConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.config.form.columns
        })
        return editConfig
      },
      initEditButtonConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.config.form.columns
        })
        return editConfig
      },
      closeDialog() {
        this.$emit('close-dialog')
      },
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          // 如果有数据，更新子组件的 formData
          getMenuById(row.sysMenuId).then(response => {
            this.$refs.editButtonDialog.updataForm(response.data)
          })
        }
      },
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.fetchData()
      },
      deleteClick(row) {
        console.log(row);
        this.$confirm('确定删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenuById(row.sysMenuId).then(response =>{
            this.fetchData()
            this.$message.success('删除成功')
          })
        })
      },
      createSubmit(submitData) {
        const query = Object.assign(submitData, {
          parentId: this.menuId,
          type: 1
        })
        console.log(query);
        saveMenu(query).then(response => {
          this.fetchData()
          this.createButtonDialogVisible = false
          this.$refs.createButtonDialog.resetForm()
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.createButtonDialog.resetSubmitBtn()
        })
      },
      editSubmit(submitData) {
        const query = Object.assign(submitData, {
          parentId: this.menuId,
          type: 1
        })
        updateMenu(query).then(response => {
          this.fetchData()
          this.editButtonDialogVisible = false
          this.$refs.editButtonDialog.resetForm()
          this.$message.success('编辑成功')
        }).catch(err => {
          this.$refs.editButtonDialog.resetSubmitBtn()
        })
      }
    }
  }
</script>

<style>
</style>
