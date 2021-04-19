<template>
  <div class="page-container">
    <filter-bar :config="threeViolationFilterConfig" @search-click="queryData" @create-click="openDialog('create')"
      @refresh-click="queryData" @import-click="importClick"/>
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="threeViolationConfig" @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick" @submit-data="editSubmit" @other-click="otherClick"/>
    <div v-show="total > 0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteClick">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog ref="createDialog" :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />
    <detailed-information ref="threeViolationsDetailed" :registerInfo="registerInfo" :dialog-visible="detailedInformationDisabled"
        @close-dialog="detailedInformationDisabled = false">
    </detailed-information>
  </div>
</template>

<script>
  import {
    getsysDictListById,
    getAqglThreeRegisterList,
    getAqglThreeRegisterById,
    saveAqglThreeRegister,
    updateAqglThreeRegister,
    deleteaqglThreeRegister
  } from '@/api/hidden-danger'
  import {
    threeViolationFilterConfig,
    threeViolationConfig
  } from '@/data/hidden-danger'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import DetailedInformation from './components/detailed-information'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      DetailedInformation
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
        threeViolationFilterConfig,
        threeViolationConfig,
        deleteDisabled: true,
        createDialogVisible: false,
        editDialogVisible: false,
        detailedInformationDisabled: false,
        registerInfo: {}
      }
    },
    created() {
      this.__fetchData()
      this.__fetchSelectList()
    },
    methods: {
      __fetchSelectList() {
        const query = [{
          parentId: 10088
        }, {
          parentId: 10042
        }, {
          parentId: 10122
        }, {
          parentId: 24
        }]
        for (let q in query) {
          getsysDictListById(query[q].parentId).then(response => {
            console.log(response);
            let selectList = response.data
            for (let m in response.data) {
              this.getIterationData(selectList[m], response.data[m])
            }
            console.log(selectList);
            this.threeViolationConfig.columns.forEach(it => {
              if (query[q].parentId == 10088) {
                if (it.field === 'examineShiftId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 10042) {
                if (it.field === 'examinePathId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 10122) {
                if (it.field === 'flag') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 24) {
                if (it.field === 'grade') {
                  it.options = selectList
                }
              }
            })
          })
        }
      },
      getIterationData(_m, _d) {
        _m.label = _d.dictName
        _m.value = _d.sysDictId
        _m.children = _d.sysDictList
        if (_d.sysDictList.length > 0) {
          for (let m in _d.sysDictList) {
            this.getIterationData(_m.children[m], _d.sysDictList[m])
          }
        }
      },
      __fetchData() {
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: this.filter.name,
          keywordField: ['disciplinary', 'examineDept', 'unit']
        }
        getAqglThreeRegisterList(query).then(response => {
          console.log(response);
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        })
      },
      otherClick(row, index, item){
        console.log(row, index, item);
        this.registerInfo = row
        this.detailedInformationDisabled = true
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      },
      importClick(){
        this.$message.info("尚未开发，敬请期待")
      },
      pagination(data) {
        this.listQuery.page = data.page
        this.listQuery.pagerows = data.pagerows
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '800px',
          form: this.threeViolationConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '800px',
          form: this.threeViolationConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          getAqglThreeRegisterById(row.aqglThreeRegisterId).then(response => {
            this.$refs.editDialog.updataForm(response.data)
          })
        }
      },
      // 删除
      deleteClick(row) {
        this.$confirm('确定删除该组织结构?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteaqglThreeRegister(row.aqglThreeRegisterId).then(response => {
            this.$message.success('删除成功')
            this.__fetchData()
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        saveAqglThreeRegister(submitData).then(response => {
          this.__fetchData()
          this.$refs.createDialog.resetForm()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        })
      },
      editSubmit(submitData) {
        updateAqglThreeRegister(submitData).then(response => {
          this.__fetchData()
          this.$refs.editDialog.resetForm()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        })
      }
    }
  }
</script>
