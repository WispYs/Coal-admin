<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="FilterConfig" @search-click="queryData" @create-click="openDialog('create')"
        @identificationEnd="identificationEnd" @reset-click="queryData" />
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="TableConfig" @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick" @selection-change="selectionChange" @submit-data="editSubmit"/>
      <div v-show="total > 0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteClick">
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
          @pagination="__fetchData" />
      </div>
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
    getAqglRiskIdentifyList,
    saveAqglRiskIdentify,
    updateAqglRiskIdentify,
    deleteAqglRiskIdentify,
    getAqglRiskIdentifyById
  } from '@/api/assessment-library'
  import {
    getsysDictListById,
    endRiskRecognize
  } from '@/api/hidden-danger'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import TreeBar from '@/components/TreeBar'
  import {
    TableConfig,
    FilterConfig
  } from '@/data/assessment-library'

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
        id: 'assessment-library',
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
        riskFilterList: [],
        treeData: {
          title: '选择专业',
          list: []
        },
        checkBox: [],
        deleteDisabled: true
      }
    },
    created() {
      this.__fetchData()
      this.__fetchSelectList()
    },
    methods: {
      __fetchSelectList() {
        const query = [{
          parentId: 10028
        }, {
          parentId: 10042
        }, {
          parentId: 18
        }, {
          parentId: 10054
        }, {
          parentId: 10060
        }, {
          parentId: 10066
        }, {
          parentId: 17
        }]
        for (let q in query) {
          getsysDictListById(query[q].parentId).then(response => {
            console.log(response);
            let selectList = response.data
            for (let m in response.data) {
              this.getIterationData(selectList[m], response.data[m])
            }
            console.log(selectList);
            this.TableConfig.columns.forEach(it => {
              if (query[q].parentId == 10028) {
                if (it.field === 'majorId') {
                  this.treeData.list = selectList
                  it.options = selectList
                }
              } else if (query[q].parentId == 10042) {
                if (it.field === 'riskId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 18) {
                if (it.field === 'riskTypeId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 10054) {
                if (it.field === 'accidentPossibilityId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 10060) {
                if (it.field === 'accidentHappensId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 10066) {
                if (it.field === 'identifyTheTypeId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 17) {
                if (it.field === 'riskGradeId') {
                  it.options = selectList
                  console.log(it);
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
          entity: {
            majorId: this.filter.majorId
          },
          keyword: this.filter.name,
          keywordField: ['riskUserName']
        }
        getAqglRiskIdentifyList(query).then(response => {
          this.listLoading = false
          this.list = response.data.rows
          for(let _l in this.list){
            this.list[_l].riskTypeId = this.list[_l].riskTypeId.split(",")
          }
          this.total = Number(response.data.records)
        })
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      },
      // 点击树形菜单时触发
      handleNodeClick(data) {
        const majorId = data.value
        this.filter = Object.assign(this.filter, { majorId })
        this.__fetchData()
      },
      // 点击辨识结束按钮触发
      identificationEnd() {
        endRiskRecognize(this.checkBox[0].aqglRiskIdentifyId).then(response =>{
          this.__fetchData()
          this.$message.success("辨识结束")
        })
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '900px',
          form: this.TableConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '800px',
          form: this.TableConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          getAqglRiskIdentifyById(row.aqglRiskIdentifyId).then(response =>{
            let riskTypeId = response.data.riskTypeId.split(",")
            const info = Object.assign(response.data, {
              accidentHappensId: Number(response.data.accidentHappensId) || 0,
              riskTypeId: riskTypeId
            })
            this.$refs.editDialog.updataForm(info)
          })
        }
      },
      selectionChange(row){
        this.checkBox = row
      },
      // 删除
      deleteClick(data) {
        this.$confirm('确定删除该条风险?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // /aqglRiskIdentify/delete/{entityId}
          console.log(data);
          // return
          deleteAqglRiskIdentify(data.aqglRiskIdentifyId).then(response => {
            this.__fetchData()
            this.$message.success('删除成功')
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        let riskTypeId = ''
        for(let s in submitData.riskTypeId){
          console.log(submitData.riskTypeId[s]);
          if(!riskTypeId){
            riskTypeId = submitData.riskTypeId[s]
          }else{
            riskTypeId = riskTypeId + "," + submitData.riskTypeId[s]
          }
        }
        submitData.riskTypeId = riskTypeId

        const query = Object.assign(submitData, {
          riskValue: Number(submitData.riskValue) || 0,
          capital: Number(submitData.capital) || 0,
          personMax: Number(submitData.personMax) || 0
        })
        saveAqglRiskIdentify(query).then(response => {
          this.__fetchData()
          this.createDialogVisible = false
          this.$refs.createDialog.resetForm()
          this.$message.success('新建成功')
        })
      },
      editSubmit(submitData) {
        let riskTypeId = ''
        for(let s in submitData.riskTypeId){
          console.log(submitData.riskTypeId[s]);
          if(!riskTypeId){
            riskTypeId = submitData.riskTypeId[s]
          }else{
            riskTypeId = riskTypeId + "," + submitData.riskTypeId[s]
          }
        }
        submitData.riskTypeId = riskTypeId
        const query = Object.assign(submitData, {
          riskValue: Number(submitData.riskValue) || 0,
          capital: Number(submitData.capital) || 0,
          personMax: Number(submitData.personMax) || 0
        })
        updateAqglRiskIdentify(query).then(response => {
          this.__fetchData()
          this.$refs.editDialog.resetForm()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        })
      }

    }
  }
</script>
