<template>
  <div class="page-container">
    <filter-bar
      :config="MsgFilterConfig"
      @search-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="NewsConfig"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
  </div>
</template>

<script>
import { getMsgRecord } from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import { NewsConfig,MsgFilterConfig } from '@/data/authority-management'

export default {
  components: { ListTable, Pagination,FilterBar },
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
      NewsConfig,
      MsgFilterConfig,
      list: []
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query ={
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        // entity: {parentId: 0},
        // sort: {asc: ["orderNum"]}
      }
      getMsgRecord(query).then(response => {
        console.log(response);
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.total)
      })
    },
    // 查询数据
    queryData(filter) {
      if (filter) {
        this.$message.success('查询成功')
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      } else {
        this.$message.error('请输入查询内容')
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '500px',
        form: this.NewsConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.NewsConfig.columns
      })
      return editConfig
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
