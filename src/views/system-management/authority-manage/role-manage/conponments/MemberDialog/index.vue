<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog">
    <div v-if="config.type =='member'" class="member">
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
      <list-table :id="id" :list="roleUserInfo.roleUserList" :list-loading="listLoading" :config="memberConfig" @selection-change="selectionChange" />
    </div>
    <div slot="footer" class="dialog-footer">
      <pagination v-show="roleUserInfo.total>0" :total="roleUserInfo.total" :page.sync="roleUserInfo.listQuery.page" :limit.sync="roleUserInfo.listQuery.pagerows"
        @pagination="updataPage" />
    </div>
  </el-dialog>
</template>
<script>
  import {
    deleteRoleUser
  } from '@/api/authority-management'
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
      },
      selectRole: {
        type: Object,
        default: () => ({})
      },
      roleUserInfo:{
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
        list: [],
        memberConfig,
        listLoading: false,
        total: this.roleUserInfo.total,
        listQuery: {
          page: this.roleUserInfo.page,
          pagerows: this.roleUserInfo.pagerows
        },
        selectMember:[]
      }
    },
    created() {
      console.log(this.listQuery);
      console.log(this.total);
    },
    methods: {
      // 更新组件内 form 数据
      updataPage(_data) {
        this.$emit("updataPage",_data,1)
      },
      membersVisible() {
        this.$emit('membersVisible')
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      removeMember() {
        console.log(this.roleUserInfo);
        let sysUserIds = [];
        for(let _s of this.selectMember){
          sysUserIds.push(_s.sysUserId);
        }
        const query= {
          sysRoleId: this.selectRole.sysRoleId,
          sysUserIds: sysUserIds
        }
        deleteRoleUser(query).then(response => {
          this.$emit('synchro',"移除",1)
        })
      },
      // 同步
      synchro() {
        this.$emit('synchro', '同步',1)
      },
      // 搜索
      search() {
        // this.getRoleUserList()/
        this.$emit("search",this.content,1)
      },
      selectionChange(val) {
        this.selectMember = val
        console.log(val)
        if (val.length > 0) {
          this.deleteDisabled = false
        } else {
          this.deleteDisabled = true
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

  .dialog-footer {
    .pagination-container {
      padding: 0;
    }
  }
</style>
