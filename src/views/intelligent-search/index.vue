<template>
  <div class="page-container">
    <div class="filter-bar__item">
      <el-input
        v-model="searchVal"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-select slot="prepend" v-model="selectVal" class="select-wrapper" placeholder="请选择">
          <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
    </div>

    <el-divider />

    <div v-if="list.length" class="tree-form-container">
      <!-- 表格 -->
      <list-table
        id="fileSearch"
        :list="list"
        :list-loading="listLoading"
        :config="IntelligentSearchTableConfig"
        @preview-click="filePreview"
      />

      <div v-show="total>0" class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="searchFile"
        />
      </div>
    </div>

    <div v-if="menuList.length" class="tree-form-container">
      <!-- 表格 -->
      <list-table
        id="menuSearch"
        :list="menuList"
        :list-loading="menuListLoading"
        :config="IntelligentSearchMenuTableConfig"
        @preview-click="menuPreview"
      />

      <div v-show="menuTotal>0" class="page-bottom">
        <pagination
          :total="menuTotal"
          :page.sync="menuListQuery.page"
          :limit.sync="menuListQuery.pagerows"
          @pagination="searchMenu"
        />
      </div>
    </div>

  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import {
  getFolderResult,
  getMenuResult,
  getFileByFileName
} from '@/api/intelligent-search'
import {
  IntelligentSearchTableConfig,
  IntelligentSearchMenuTableConfig
} from '@/data/intelligent-search'

export default {
  components: {
    ListTable,
    Pagination
  },
  data() {
    return {
      id: 'intelligent-search',
      bussiness: 'yjjyAttachmentManagement',
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      IntelligentSearchTableConfig,
      IntelligentSearchMenuTableConfig,
      deleteDisabled: true, // 批量删除置灰
      searchVal: '',
      selectVal: 1,
      options: [],
      menuListLoading: true,
      menuListQuery: {
        page: 1,
        pagerows: 10
      },
      menuList: [],
      menuTotal: 0
    }
  },

  created() {
    // this.__fetchData()
    this.__initOptions()
  },
  methods: {
    // 初始化选择器
    __initOptions() {
      const options = IntelligentSearchTableConfig.columns.find(i => i.field === 'type')
      this.options = options.options
    },
    // 搜索文件
    searchFile() {
      this.listLoading = false
      const filter = {
        entity: {
          fileName: this.searchVal
        }
      }
      const query = Object.assign(this.listQuery, filter)
      getFolderResult(query).then(response => {
        response.data.rows.forEach((r, idx) => {
          r.index = idx + 1
          r.type = 2
        })
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 搜索菜单
    searchMenu() {
      this.menuListLoading = false
      const filter = {
        entity: {
          menuName: this.searchVal
        }
      }
      const query = Object.assign(this.menuListQuery, filter)
      getMenuResult(query).then(response => {
        response.data.rows.forEach((r, idx) => {
          r.index = idx + 1
          r.type = 3
        })
        this.menuListLoading = false
        this.menuList = response.data.rows
        this.menuTotal = Number(response.data.records)
      })
    },
    // 查询数据
    search(filter) {
      this.list = []
      this.menuList = []
      this.menuListQuery = {
        page: 1,
        pagerows: 10
      }
      this.listQuery = {
        page: 1,
        pagerows: 10
      }
      if (this.selectVal === 2) {
        this.searchFile()
      } else if (this.selectVal === 3) {
        this.searchMenu()
      } else {
        this.searchFile()
        this.searchMenu()
      }
      // this.filter = Object.assign(this.filter, filter)
    },
    // 文件预览
    filePreview(row) {
      console.log(row)
      getFileByFileName(row.sysFileInfoId)
    },
    // 菜单预览
    menuPreview(row) {
      window.open(`${window.location.origin}${window.location.pathname}#${row.path}`)
    }
  }
}
</script>

<style scoped lang="scss">
.filter-bar__item {
  width: 1000px;
  margin: 0 auto;
}
.select-wrapper {
  ::v-deep .el-input {
      width: 130px;
  }
}
</style>
