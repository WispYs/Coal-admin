<template>
  <div class="page-container">
    <filter-bar :config="warnRuleManageFilterConfig" @search-click="queryData" @create-click="openDialog()" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      height="calc(100% - 157px)"
      :config="warnRuleManageconfig"
      @edit-click="(row) => openDialog(row)"
      @delete-click="deleteClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />

    <add-dialog
      :dialog-visible="createDialogVisible"
      :select-list="childSelectList"
      :rule-info="singleInfo"
      :config="warnRuleManageconfig"
      @close-dialog="closeDialog"
      @create-submit="createSubmit"
    />
  </div>
</template>

<script>
import {
  getFormwork,
  saveFormwork,
  getFormworkById,
  updateFormwork,
  delFormworkById,
  getDefinition,
  selectFormwork,
  selectMangerLsit,
  saveDefinition,
  delDefinitionById,
  getDefinitionById,
  updateDefinition
} from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import FormDialog from '@/components/FormDialog'
import {
  warnRuleManageconfig,
  warnRuleManageFilterConfig
} from '@/data/authority-management'
import AddDialog from './components/AddDialog/index.vue'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar,
    FormDialog,
    AddDialog
  },
  data() {
    return {
      id: '',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      warnRuleManageconfig,
      warnRuleManageFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      list: [],
      childSelectList: {
        templateList: [],
        targetList: []
      },
      singleInfo: {
        definitionName: '',
        definitionCode: '',
        definitionStatus: null,
        grade: '',
        definitionTarget: '',
        definitionTargetId: '',
        beginTime: '',
        endTime: '',
        quota: '',
        jcs: [{
          connect: '',
          key: {
            node: '',
            nodeValue: ''
          },
          condition: '',
          value: ''
        }],
        pdn: '',
        gzyqFormworkId: ''
      },
      isEdit: false
    }
  },
  created() {
    this.__fetchFormwork()
    this.__fetchTarget()
    this.__fetchData()
  },
  methods: {
    __fetchTarget() {
      const query = {}
      selectMangerLsit(query).then(response => {
        const MangerLsit = []
        for (const r in response.data) {
          MangerLsit.push({
            label: response.data[r].filedName,
            value: response.data[r].gzyqMangerId
          })
        }
        this.childSelectList.targetList = MangerLsit
      })
    },
    __fetchFormwork() {
      const query = {}
      selectFormwork(query).then(response => {
        const formworkList = []
        for (const r in response.data) {
          formworkList.push({
            label: response.data[r].formworkName,
            value: response.data[r].gzyqFormworkId
          })
        }
        this.childSelectList.templateList = formworkList
        this.warnRuleManageconfig.columns.forEach(it => {
          if (it.field == 'gzyqFormworkId') {
            it.options = formworkList
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.keyword,
        keywordField: ['definitionName']
      }
      getDefinition(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          this.list.forEach(it => {
            if (it.definitionStatus == 1) {
              it.definitionStatus = '启用'
            } else if (it.definitionStatus == 0) {
              it.definitionStatus = '禁用'
            }
          })
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
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    // 打开弹窗
    openDialog(row) {
      this.createDialogVisible = true
      if (row) {
        getDefinitionById(row.gzyqDefinitionId).then(response => {
          for (const d in response.data) {
            if (d == 'definitionStatus') {
              console.log(response.data[d])
              if (response.data[d] == 1) {
                response.data[d] = true
              } else if (response.data[d] == 0) {
                response.data[d] = false
              }
            }
          }
          const info = Object.assign(response.data, {
            jcs: JSON.parse(response.data.jcs)
          })
          this.isEdit = true
          this.singleInfo = info
        })
      }
    },
    deleteClick(row) {
      this.$confirm('确定删除该配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDefinitionById(row.gzyqDefinitionId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      let getListFn = null
      // 如果isEdit为true，则为修改，否则为创建
      if (this.isEdit) {
        getListFn = updateDefinition
      } else {
        getListFn = saveDefinition
      }
      const query = Object.assign(submitData)
      getListFn(query).then(response => {
        this.createDialogVisible = false
        this.clearData()
        this.__fetchData()
      })
    },
    closeDialog() {
      this.clearData()
      this.createDialogVisible = false
    },
    clearData() {
      this.isEdit = false
      this.singleInfo = {
        definitionName: '',
        definitionCode: '',
        definitionStatus: null,
        grade: '',
        definitionTarget: '',
        beginTime: '',
        endTime: '',
        quota: '',
        jcs: [{
          connect: '',
          key: {
            node: '',
            nodeValue: ''
          },
          condition: '',
          value: ''
        }],
        pdn: '',
        gzyqFormworkId: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

</style>
