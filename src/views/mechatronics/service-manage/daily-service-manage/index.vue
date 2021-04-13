<template>
  <div class="page-container">
    <filter-bar
      :config="DailyServiceFilterConfig"
      @search-click="queryData"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="DailyServiceTableConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <div v-show="total>0" class="page-bottom">
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>
    <!-- 日常维检 -->
    <daily-service
      ref="dailyService"
      :dialog-visible="dailyServiceVisible"
      @close-dialog="dailyServiceVisible = false"
      @submit="dailyServiceSubmit"
    />
    <!-- 维检记录 -->
    <service-record
      ref="serviceRecord"
      :dialog-visible="serviceRecordVisible"
      @close-dialog="serviceRecordVisible = false"
    />

  </div>
</template>

<script>
import { getDailyServiceList, createApplication, editApplication, getApplicationInfo, delApplication, getOrganTree } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import DailyService from './components/DailyService'
import ServiceRecord from './components/ServiceRecord'
import { DailyServiceTableConfig, DailyServiceFilterConfig } from '@/data/mechatronics'

export default {
  components: { FilterBar, ListTable, Pagination, DailyService, ServiceRecord },
  data() {
    return {
      id: 'know-ledge',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      DailyServiceFilterConfig,
      DailyServiceTableConfig,
      dailyServiceVisible: false, // 日常维检
      serviceRecordVisible: false // 维检记录

    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const entity = {
        ...this.filter
      }
      const sort = {
        sort: {
          asc: ['orderNum']
        }
      }
      const query = Object.assign(this.listQuery, sort, { entity })
      getDailyServiceList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },

    // 日常维检，维检记录按钮
    otherClick(row, index, item) {
      if (item === '日常维检') {
        this.dailyServiceVisible = true
      } else if (item === '维检记录') {
        this.serviceRecordVisible = true
      }
    },

    // 日常维检提交
    dailyServiceSubmit(submitData) {
      console.log(submitData)
      this.dailyServiceVisible = false
      this.$message.success('提交成功')
      this.$refs.dailyService.resetForm()
    }

  }
}
</script>
