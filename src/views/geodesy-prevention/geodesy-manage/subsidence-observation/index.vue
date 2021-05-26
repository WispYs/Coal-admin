<template>
  <div class="page-container">
    <filter-bar :config="subsidenceObservationFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="subsidenceObservationConfig" height="calc(100% - 157px)"
      @other-click="otherClick" />
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
      @pagination="__fetchData" />
    <!-- 展开详情 -->
    <detail-dialog ref="detailDialog" :config="initDetailConfig()" :dialog-visible="detailDialogVisible" @close-dialog="detailDialogVisible = false"
      @open-dialog="openDialog" />
    <!-- 新建弹窗 -->
    <form-dialog ref="createDialog" :config="initCreateConfig()" :dialog-visible="createDetailDialogVisible"
      @close-dialog="createDetailDialogVisible = false" @submit="createSubmit" />
    <!-- 新建弹窗 -->
    <form-dialog ref="editDetailDialog" :config="initEditConfig()" :dialog-visible="editDetailDialogVisible"
      @close-dialog="editDetailDialogVisible = false" @submit="editSubmit" />
  </div>
</template>

<script>
  import {
    getWorkFacetList
  } from '@/api/mining-management'
  import {
    saveSinkRecord,
    getSinkRecordById,
    updateSinkRecord
  } from '@/api/geodesy-prevention'
  import {
    getsysDictListById
  } from '@/api/hidden-danger'
  import {
    subsidenceObservationConfig,
    subsidenceObservationFilterConfig,
    subsidenceObservationRecordConfig,
    subsidenceObservationRecordFilterConfig
  } from '@/data/geodesy-prevention'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import DetailDialog from './components/DetailDialog/index.vue'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      DetailDialog
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
        subsidenceObservationConfig,
        subsidenceObservationFilterConfig,
        subsidenceObservationRecordConfig,
        subsidenceObservationRecordFilterConfig,
        detailDialogVisible: false,
        createDetailDialogVisible: false,
        editDetailDialogVisible: false,
        sinkRecordId: ''
      }
    },
    created() {
      this.__fetchLevelList()
      this.__fetchData()
    },
    methods: {
      __fetchLevelList() {
        const query = [{
          // 工作面状态
          parentId: 111242
        }, {
          // 采煤工艺
          parentId: 111248
        }]
        for (const q in query) {
          getsysDictListById(query[q].parentId).then(response => {
            const selectList = []
            for (const m in response.data) {
              selectList.push({
                label: response.data[m].dictName,
                value: response.data[m].sysDictId
              })
            }
            this.subsidenceObservationConfig.columns.forEach(it => {
              if (query[q].parentId == 111242) {
                if (it.field === 'workStatusId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 111248) {
                if (it.field === 'coalMiningCraftId') {
                  it.options = selectList
                }
              }
            })
          })
        }
      },
      __fetchData() {
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: this.filter.name,
          keywordField: ['gzmName', 'workStatus'],
          sort: {
            asc: ['orderNum']
          }
        }
        getWorkFacetList(query).then(response => {
          if (response.data.rows.length > 0) {
            this.listLoading = false
            this.list = response.data.rows
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
      // 初始化详情窗口配置
      initDetailConfig() {
        const createConfig = Object.assign({
          title: '沉陷观测记录',
          width: '1000px',
          filter: this.subsidenceObservationRecordFilterConfig,
          form: this.subsidenceObservationRecordConfig
        })
        return createConfig
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '1000px',
          form: this.subsidenceObservationRecordConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.subsidenceObservationRecordConfig.columns
        })
        return editConfig
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      },
      otherClick(_data) {
        console.log(_data)
        this.sinkRecordId = _data.cjglWorkFacetId
        this.detailDialogVisible = true
        this.$refs.detailDialog.__fetchData(_data.cjglWorkFacetId)
      },
      // 打开弹窗
      openDialog(name, row) {
        console.log(name, row)
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          getSinkRecordById(row.dcfzsSinkRecordId).then(response => {
            const info = Object.assign(response.data)
            this.$refs[`${name}Dialog`].updataForm(info)
          })
        }
      },
      createSubmit(submitData) {
        const query = Object.assign(submitData, {
          gzmNameId: this.sinkRecordId
        })
        saveSinkRecord(query).then(response => {
          this.$refs.detailDialog.__fetchData(this.sinkRecordId)
          this.$refs.createDialog.resetForm()
          this.createDetailDialogVisible = false
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.createDialog.resetSubmitBtn()
        })
      },
      editSubmit(submitData) {
        const query = Object.assign(submitData, {
          gzmNameId: this.sinkRecordId
        })
        updateSinkRecord(query).then(response => {
          this.$refs.detailDialog.__fetchData(this.sinkRecordId)
          this.$refs.editDetailDialog.resetForm()
          this.editDetailDialogVisible = false
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.editDetailDialog.resetSubmitBtn()
        })
      }
    }
  }
</script>
