<template>
  <div class="page-container">
    <organ-button-search :updateDisabled="updateDisabled" :deleteDisabled="deleteDisabled" @openDialog="openDialog" :moveUpDisabled="moveUpDisabled" :moveDownDisabled="moveDownDisabled"
      @deleteClick="deleteClick" @moveUpClick="moveUpClick" @moveDownClick="moveDownClick" @handelExport="handelExport"
      @synchroClick="synchroClick" @queryData="queryData"></organ-button-search>
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="OrganTableConfig" @load-tree-data="asyncData"
      @addIco="(row) => openDialog('create', row)" @editIco="(row) => openDialog('edit', row)" @deleteIco="deleteClick"
      @moveUpIco="moveUpClick" @moveDownIco="moveDownClick" @selectionChange="selectionChange" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />
    <!-- 新建弹窗 -->
    <form-dialog :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />

  </div>
</template>

<script>
  import {
    getOrganList,
    createOrganLsit
  } from '@/api/authority-management'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import OrganButtonSearch from './components/organ-button-search/index.vue'
  import { OrganTableConfig } from '@/data/authority-management'
  import exportExcel from '@/utils/export-excel'

  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      OrganButtonSearch
    },
    data() {
      return {
        id: 'organization-manage',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        OrganTableConfig,
        createDialogVisible: false,
        editDialogVisible: false,
        updateDisabled: true,
        deleteDisabled: true,
        institutionSearch: '',
        moveUpDisabled: true,
        moveDownDisabled: true,
        selectData: []
      }
    },
    created() {
      this.__fetchData()
    },
    methods: {
      __fetchData() {
        this.listLoading = true
        const query = Object.assign(this.listQuery, this.filter)
        getOrganList(query).then(response => {
          this.listLoading = false
          this.list = response.data.items
          this.total = response.data.total
        })
      },

      // 异步获取树子节点数据
      asyncData(tree, treeNode, resolve) {
        console.log(tree, treeNode, resolve)
        setTimeout(() => {
          resolve([{
            name: '矿领导',
            num: '001010',
            abbreviation: '矿领导',
            type: 3,
            sort: 2,
            createDate: '2020.07.21'
          }, {
            name: '办公室',
            num: '001012',
            abbreviation: '办公室',
            type: 2,
            sort: 186,
            createDate: '2020.12.19'
          }])
        }, 1000)
      },
      // 查询数据
      queryData(filter) {
        console.log(filter);
        if (!!filter) {
          this.$message.success('查询成功');
        }else{
          this.$message.info("请输入查询关键字")
        }
        this.filter = Object.assign(this.filter, filter);
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '800px',
          form: this.OrganTableConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '800px',
          form: this.OrganTableConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          // 如果有数据，更新子组件的 formData
          this.$refs.editDialog.updataForm(row);
        } else {
          console.log(this.selectData);
          this.$refs.editDialog.updataForm(this.selectData[0]);
        }
      },
      // 删除
      deleteClick(row, index) {
        this.$confirm('确定删除该组织吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // if(row && index){

          // }else{

          // }
          this.$message.success('删除成功')
          this.__fetchData();
        }).catch(() => {
          this.$message.info('已取消删除')
        });
      },
      // submit createData
      createSubmit(submitData) {
        console.log(submitData)
        // const _data = Object.assign(this.listQuery,submitData);
        // createOrganLsit(_data).then(res=>{
        //   console.log(res);
        // })
        this.createDialogVisible = false;
        this.$message.success('新建成功');
        this.__fetchData();
      },
      // submit edit
      editSubmit(submitData) {
        console.log(submitData)
        this.editDialogVisible = false;
        this.$message.success('编辑成功')
        this.__fetchData();
      },
      // 定义导出Excel表格事件
      handelExport() {
        // 第一个参数为 table 的 id
        // 第二个参数为导出文件的 name
        exportExcel(this.id, '组织机构管理')
      },
      // 同步
      synchroClick() {
        this.__fetchData();
        this.$message.success('同步成功')
      },
      // 上移
      moveUpClick(row, index) {
        if (row && index) {
          this.list[index] = this.list[index - 1];
          this.list[index - 1] = row;
        } else {
          let _index;
          for (let d in this.list) {
            console.log(d);
            if (this.list[d].name == this.selectData[0].name) {
              _index = d;
              break;
            }
          }
          if (_index == 0) {
            this.$message.error("该数据已经位于最前面,不能再上移了哈");
            return;
          } else {
            this.list[_index] = this.list[_index - 1];
            this.list[_index - 1] = this.selectData[0];
          }
        }
        this.$message.success('上移成功');
        this.__fetchData();
      },
      // 下移
      moveDownClick(row, index) {
        this.list[index] = this.list[index + 1];
        this.list[index + 1] = row;;
        this.$message.success('下移成功');
        this.__fetchData();
      },
      // 点击checkbox触发
      selectionChange(_data) {
        this.selectData = _data;
        console.log(_data);
        if (this.selectData.length > 0) {
          this.deleteDisabled = false;
          if (this.selectData.length == 1) {
            this.updateDisabled = false;
            this.moveDownDisabled = false;
            this.moveUpDisabled = false;
          } else {
            this.updateDisabled = true;
            this.moveDownDisabled = true;
            this.moveUpDisabled = true;
          }
        } else {
          this.deleteDisabled = true;
          this.updateDisabled = true;
          this.moveDownDisabled = true;
          this.moveUpDisabled = true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
