<template>
  <div class="page-container">
    <filter-bar :config="knownWaterSampleAnalysisFilterConfig" @search-click="queryData" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="knownWaterSampleAnalysisConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
    <!-- 展开详情 -->
    <detail-dialog ref="detailDialog" :config="initDetailConfig()" :dialog-visible="detailDialogVisible" @close-dialog="detailDialogVisible = false" />
  </div>
</template>

<script>
import {
  getWaterInfoList
} from '@/api/geodesy-prevention'
import { getOrganTree } from '@/api/authority-management'
import {
  knownWaterSampleAnalysisConfig,
  knownWaterSampleAnalysisFilterConfig,
  knownWaterSampleAnalysisDetailConfig
} from '@/data/geodesy-prevention'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import DetailDialog from './DetailDialog/index.vue'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
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
      detailDialogVisible: false,
      analysisParameter: {},
      knownWaterSampleAnalysisFilterConfig,
      knownWaterSampleAnalysisConfig,
      knownWaterSampleAnalysisDetailConfig
    }
  },
  created() {
    this.__fetchUnit()
    this.__fetchData()
  },
  methods: {
    __fetchUnit() {
      getOrganTree().then(response => {
        this.knownWaterSampleAnalysisDetailConfig.columns.forEach(it => {
          if (it.field === 'dcfzsUnitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        entity: {
          isEnter: 1,
          sfbzsy: 2
        },
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['hscNoName']
      }
      getWaterInfoList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      }).catch(err => {
        this.listLoading = false
      })
    },
    // 初始化详情窗口配置
    initDetailConfig() {
      const createConfig = Object.assign({
        title: '阴阳离子',
        width: '1000px',
        filter: '',
        form: this.knownWaterSampleAnalysisDetailConfig
      })
      return createConfig
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    otherClick(_data, _value, _name) {
      if (_name == '查看') {
        this.detailDialogVisible = true
        this.analysisParameter.dcfzsWaterInfoId = _data.dcfzsWaterInfoId
        this.analysisParameter.hscNoName = _data.hscNoName
        this.analysisParameter.qycw = _data.qycw
        console.log(this.analysisParameter);
        this.$refs.detailDialog.__fetchData(this.analysisParameter)
      } else {
        this.$message.info('敬请期待')
      }
    }
  }
}
</script>
