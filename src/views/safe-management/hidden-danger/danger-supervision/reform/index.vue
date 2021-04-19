<template>
  <div class="page-container">
    <div class="filter-bar">
      <filter-bar :config="reformFilterConfig" @search-click="queryData" style="display: inline-block;"/>
      <div style="display: inline-block;">
        <div class="filter-bar__item filter_button">
          <el-button style="padding: 10px 10px;" icon="el-icon-check" type="primary" size="medium" :disabled="checkDisabled" @click="check()">送审复查</el-button>
        </div>
        <div class="filter-bar__item filter_button">
          <el-button style="padding: 10px 10px;" icon="el-icon-back" type="primary" size="medium" :disabled="returnHiddenDisabled" @click="returnHidden()">退回隐患</el-button>
        </div>
        <div class="filter-bar__item filter_button">
          <el-button style="padding: 10px 10px;" icon="el-icon-document-add" type="primary" size="medium" :disabled="returnHiddenDisabled" @click="applicationExtension()">申请延期</el-button>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <list-table
      :id="id"
      :list="tableData"
      :list-loading="listLoading"
      :config="reformTableConfig"
      height="calc(100% - 157px)"
      @selection-change="selectionChange"
    />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
      @pagination="__fetchData" />
  </div>
</template>
<script>
import ListTable from '@/components/ListTable'
import { reformTableConfig,reformFilterConfig } from '@/data/hidden-danger'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar
  },
  data() {
    return {
      id:"reform",
      listLoading: true,
      reformTableConfig,
      reformFilterConfig,
      list: [],
      listQuery: {
        page: 1,
        pagerows: 10
      },
      total:1,
      selectCheckbox:[],
      checkDisabled: true,
      returnHiddenDisabled: true,
      applicationExtensionDisabled: true,
      tableData: [
        {
          level: '一般隐患C',
          status: '待修复',
          checkDate: '2021.01.27',
          classes: '',
          checkType: '',
          checkOrganization: '掘进五区区直',
          person: '徐长春',
          accompanyPerson: '',
          proMan: '',
          addr: '1163（3）轨顺',
          dangerType: '',
          changeDate: '2021.01.31',
          statusExplain: '',
          review: '',
          content: '',
          measure: '',
          files: ''
        }
      ]
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData(){
      this.listLoading = false
      // const filter = {
      //   ...this.filter,
      //   keywordField: ['workNumber', 'loginName', 'userName']
      // }
      // const query = Object.assign(this.listQuery, filter)
      // getUserList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.rows
      //   this.total = Number(response.data.records)
      // })
    },
    queryData() {
      // console.log(this.keywords)
    },
    check(){

    },
    returnHidden(){

    },
    applicationExtension(){

    },
    selectionChange(row){
      this.selectCheckbox= row
      if(this.selectCheckbox.length == 1){
        this.checkDisabled = false
        this.returnHiddenDisabled = false
        this.applicationExtensionDisabled= false
      }else{
        this.checkDisabled = true
        this.returnHiddenDisabled = true
        this.applicationExtensionDisabled= true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
  .color-lump {
    padding: 10px 20px;
    color: $whiteColor;
    &.green {
      background: $greenColor;
    }
    &.blue {
      background: $primaryColor;
    }
    &.orange {
      background: $orangeColor;
    }
    &.red {
      background: $redColor;
    }
  }
  .filter_button{
    margin: 0 22px 15px 0;
  }
</style>
