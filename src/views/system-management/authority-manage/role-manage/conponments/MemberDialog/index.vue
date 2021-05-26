<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog">
    <div v-if="config.type =='member'" class="member">
      <div class="filter-bar">
        <filter-bar :config="memberFilterConfig" style="display: inline-block;" @search-click="search" />
        <div style="display: inline-block;">
          <div class="filter-bar__item filter_button">
            <el-button icon="el-icon-plus el-icon--left" type="primary" size="medium" @click="membersVisible()">添加成员</el-button>
          </div>
          <div class="filter-bar__item filter_button">
            <el-button
              icon="el-icon-delete el-icon--left"
              type="primary"
              size="medium"
              :disabled="deleteDisabled"
              @click="removeMember()"
            >移除成员</el-button>
          </div>
        </div>
      </div>
      <list-table
        :id="id"
        :list="roleUserInfo.roleUserList"
        :list-loading="listLoading"
        :config="roleUserInfo.memberConfig"
        @selection-change="selectionChange"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <pagination
        v-show="roleUserInfo.total>0"
        :total="roleUserInfo.total"
        :page.sync="roleUserInfo.page"
        :limit.sync="roleUserInfo.pagerows"
        @pagination="updataPage"
      />
    </div>
  </el-dialog>
</template>
<script>
import {
  deleteRoleUser
  // getOrganTree
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import {
  memberFilterConfig
} from '@/data/authority-management'
export default {
  components: {
    FilterBar,
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
    roleUserInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {}, // 弹窗表单
      id: 'member',
      deleteDisabled: true,
      list: [],
      memberFilterConfig,
      listLoading: false,
      // total: this.roleUserInfo.total,
      // listQuery: {
      //   page: 1,
      //   pagerows: 10
      // },
      selectMember: []
    }
  },
  created() {},
  methods: {
    // 更新组件内 form 数据
    updataPage(_data) {
      this.$emit('updataPage', _data, 1)
    },
    membersVisible() {
      this.$emit('membersVisible')
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    removeMember() {
      const sysUserIds = []
      for (const _s of this.selectMember) {
        sysUserIds.push(_s.sysUserId)
      }
      const query = {
        sysRoleId: this.selectRole.sysRoleId,
        sysUserIds: sysUserIds
      }
      deleteRoleUser(query).then(response => {
        console.log(this.roleUserInfo.page)
        this.$emit('synchro', this.roleUserInfo.page, this.roleUserInfo.pagerows, 1)
      })
    },
    // 搜索
    search(data) {
      this.$emit('search', data.keyword, 1)
    },
    selectionChange(val) {
      this.selectMember = val
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

  .filter-bar {
    margin: 12px 0 -6px 24px;

    &__item {
      display: inline-block;
      margin: 0 40px 0px 0;
      font-size: 14px;

      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }

  .filter_button {
    margin: 0 22px 0px 0;
  }
</style>
