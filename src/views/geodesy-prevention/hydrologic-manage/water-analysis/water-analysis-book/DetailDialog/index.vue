<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
    class="detail-dialog"
  >
    <div style="padding: 20px;height: 100%">
      <filter-bar :config="config.filter" @search-click="queryData" @create-click="openDialog('createDetail')" />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="config.form"
        height="calc(100% - 137px)"
        @edit-click="(row) => openDialog('editDetail', row)"
        @delete-click="deleteClick"
      />
    </div>
  </el-dialog>
</template>
<script>
import {
  getZwitterionList,
  deleteZwitterionDetail
} from '@/api/geodesy-prevention'
import ListTable from '@/components/ListTable'
import FilterBar from '@/components/FilterBar'

export default {
  components: {
    ListTable,
    FilterBar
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
      id: 'large-equip-detail',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      keyword: '',
      content: '',
      selectMember: [],
      bookId: '',
      aquiferName: '',
      qycw: '',
      filterCongig: {}
    }
  },
  created() {
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = {
        entity: {
          dcfzsWaterInfoId: this.filter
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['detectPosition', 'detectExplain']
      }
      getZwitterionList(query).then(response => {
        this.listLoading = false
        response.data.rows[0].hNoName = this.aquiferName
        response.data.rows[0].qycw = this.qycw
        this.list = response.data.rows
        this.total = Number(response.data.records)
        this.config.filter = {}
      }).catch(err => {
        this.listLoading = false
      })
    },
    // 查询数据
    queryData(filter) {
      this.aquiferName = filter.hscNoName
      this.qycw = filter.qycw
      this.filter = filter.dcfzsWaterInfoId
      this.filterCongig = filter.filter
      this.__fetchData()
    },
    // 打开弹窗
    openDialog(name, row) {
      this.$emit('open-dialog', name, row, '_detail')
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该样本数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteZwitterionDetail(row.dcfzsZwitterionId).then(response => {
          this.$message.success('删除成功')
          this.listLoading = false
          this.list = []
          this.total = 0
          this.config.filter = this.filterCongig
        })
      })
    },
    clearDate(id) {
      this.listLoading = false
      this.list = []
      this.total = 0
      this.bookId = id
    },
    closeDialog() {
      this.filter = {}
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
