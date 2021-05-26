<template>
  <div class="page-container">
    <filter-bar :config="workingFaceManageFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="workingFaceManageConfig" height="calc(100% - 157px)"
      @other-click="otherClick" />
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
      @pagination="__fetchData" />
  </div>
</template>

<script>
  import {
    getWorkFacetList,
    getWorkFacetById,
    selectMineareaInfoList,
    selectWorkFacetList,
  } from '@/api/mining-management'
  import {
    getsysDictListById
  } from '@/api/hidden-danger'
  import {
    workingFaceManageConfig,
    workingFaceManageFilterConfig
  } from '@/data/geodesy-prevention'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination
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
        workingFaceManageConfig,
        workingFaceManageFilterConfig,
      }
    },
    created() {
      this.__fetchLevelList()
      this.__fetchData()
    },
    methods: {
      __fetchLevelList() {
        const query = {
          // 工作面状态
          parentId: 111242
        }
        getsysDictListById(query.parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].dictName,
              value: response.data[m].sysDictId
            })
          }
          this.workingFaceManageConfig.columns.forEach(it => {
            if (it.field === 'workStatusId') {
              it.options = selectList
            }
          })
        })
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
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        }).catch(err => {
          this.listLoading = false
        })
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      },
      otherClick(_data) {
        this.$message.info("敬请期待")
      },
    }
  }
</script>
