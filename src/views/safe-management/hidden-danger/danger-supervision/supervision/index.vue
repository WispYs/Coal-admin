<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <div class="filter-bar">
        <filter-bar :config="reformFilterConfig" @search-click="queryData" style="display: inline-block;" />
        <div style="display: inline-block;">
          <div class="filter-bar__item filter_button">
            <el-button style="padding: 10px 10px;" icon="el-icon-check" type="primary" size="medium" :disabled="hiddenAcceptanceDisabled" @click="hiddenAcceptance()">督办隐患</el-button>
          </div>
          <div class="filter-bar__item filter_button">
            <el-button style="padding: 10px 10px;" icon="el-icon-check" type="primary" size="medium" :disabled="hiddenAcceptanceDisabled" @click="hiddenAcceptance()">取消督办</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <list-table :id="id" :list="tableData" :list-loading="listLoading" :config="supervisionTableConfig" height="calc(100% - 157px)"
        @selection-change="selectionChange" />
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="__fetchData" />
    </div>
  </div>
</template>
<script>
  import {
    getsysDictListById
  } from '@/api/hidden-danger'
  import {
    supervisionTableConfig,
    reformFilterConfig
  } from '@/data/hidden-danger'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FilterBar from '@/components/FilterBar'
  import TreeBar from '@/components/TreeBar'
  export default {
    components: {
      ListTable,
      Pagination,
      FilterBar,
      TreeBar
    },
    data() {
      return {
        id: "reform",
        listLoading: true,
        supervisionTableConfig,
        reformFilterConfig,
        list: [],
        listQuery: {
          page: 1,
          pagerows: 10
        },
        total: 1,
        selectCheckbox: [],
        hiddenAcceptanceDisabled: true,
        treeData: {
          title: '所有督办',
          list: []
        },
        treeExtend: true,
        tableData: [{
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
        }]
      }
    },
    created() {
      this.__fetchData()
      this.__fetchSupervise()
    },
    methods: {
      __fetchSupervise() {
        const query = {
          parentId: 10112
        }
        getsysDictListById(query.parentId).then(response => {
          console.log(response);
          let selectList = response.data
          for (let m in response.data) {
            this.getIterationData(selectList[m], response.data[m])
          }
          console.log(selectList);
          this.treeData.list = selectList
          // this.TableConfig.columns.forEach(it => {

          //   if (it.field === 'riskGradeId') {
          //     it.options = selectList
          //     console.log(it);
          //   }
          // })
        })

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
        this.__fetchData()
      },
      hiddenAcceptance() {

      },
      handleNodeClick(){

      },
      selectionChange(row) {
        this.selectCheckbox = row
        if (this.selectCheckbox.length == 1) {
          this.hiddenAcceptanceDisabled = false
        } else {
          this.hiddenAcceptanceDisabled = true
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

  .filter_button {
    margin: 0 22px 15px 0;
  }
</style>
