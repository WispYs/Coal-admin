<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'"
    :before-close="closeDialog">
    <div class="member" v-if="config.type =='member'">
      <div class="filters">
        <el-button type="primary" size="medium" @click="membersVisible"><i class="el-icon-plus el-icon--left" />添加成员
        </el-button>
        <el-button type="danger" size="medium" :disabled="deleteDisabled" @click="removeMember"><i class="el-icon-delete el-icon--left" />移除成员
        </el-button>
        <el-button size="medium" @click="synchro"><i class="el-icon-refresh el-icon--left" />同步
        </el-button>
        <el-input v-model="content" placeholder="工号、姓名、登录名" class="filter-item" />
        <el-button type="primary" size="medium" @click="search">搜索
        </el-button>
      </div>
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="memberConfig" @selectionChange="selectionChange"/>




    </div>
    <div slot="footer" class="dialog-footer">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
        @pagination="updataForm" />
    </div>
  </el-dialog>
</template>
<script>
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import {
    memberConfig
  } from '@/data/authority-management'
  export default {
    components: {
      ListTable,
      Pagination
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
      // 弹窗表单
      // formData: {
      //   type: Object,
      //   default: () => ({})
      // }
    },
    data() {
      return {
        formData: {}, // 弹窗表单
        content: '',
        id: 'member',
        deleteDisabled: true,
        list: [{
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        },{
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        },{
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }, {
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        },{
          name: '123',
          loginName: '顾桥煤矿',
          department: '费宇翔',
          addDate: '2021-3-22 16:40'
        }],
        memberConfig,
        listLoading: false,
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        }
      }
    },
    created() {
      const {
        form
      } = {
        ...this.config
      }
      const obj = {}
      form.forEach(item => {
        if (item.options) {
          obj[item.field] = []
        } else {
          obj[item.field] = ''
        }
      })
      this.formData = Object.assign({}, obj)
      this.total = this.list.length;
      // eventHub.$on('open-dialog', dialogVisible => {
      //   this.dialogVisible = dialogVisible
      // })
    },
    methods: {
      // 更新组件内 form 数据
      updataForm(form) {
        this.formData = Object.assign(this.formData, form)
        console.log(this.formData)
      },
      membersVisible() {
        this.$emit('membersVisible');
      },
      closeDialog() {
        this.$emit('closeDialog');
      },
      removeMember() {
        this.$emit('removeMember')
      },
      // 同步
      synchro() {
        this.$emit("synchro", '同步')
      },
      // 搜索
      search() {
        if (!!this.content) {
          this.$emit("search", this.content);
        }
      },
      selectionChange(val){
        console.log(val);
        if(val.length > 0){
          this.deleteDisabled = false;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .file-title {
    margin: 0;
    line-height: 40px;
  }

  .filters {
    width: calc(100% - 50px);
    margin: 18px auto 0;

    .el-button {
      display: inline-block;
    }

    .el-input {
      display: inline-block;
      width: 260px;
      margin-left: 50px;
      margin-right: 20px;

      .el-input__inner {
        height: 36px;
      }
    }
  }

  .el-table {
    width: calc(100% - 50px);
    margin: 20px auto 0;
  }
  .dialog-footer{
    .pagination-container{
      padding: 0;
    }
  }
</style>
