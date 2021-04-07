<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
  >
    <div style="width: calc(100% - 40px);margin: 20px auto 0;">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" @change="keywordSearch" />
        </el-col>
        <el-col :span="12" class="memberSearch">
          <div style="float: right;">
            <el-input v-model="content" style="display: inline-block;width: 220px;" placeholder="工号、姓名、登录名" />
            <el-button style="display: inline-block;margin-left: 14px;" type="primary" @click="contentSearch">搜索
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <h3 style="height: 40px;line-height: 40px;margin-left: 40px;">已选中用户</h3>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <tree-bar class="grid-content" :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <list-table
              :id="id"
              :list="roleUserInfo.roleUserList"
              :list-loading="listLoading"
              :config="memberConfig"
              @edit-click="(row) => openDialog('edit', row)"
              @delete-click="deleteClick"
              @selection-change="selectionChange"
              @submit-data="editSubmit"
            />
            <pagination
              v-show="roleUserInfo.total>0"
              :total="roleUserInfo.total"
              :page.sync="roleUserInfo.listQuery.page"
              :limit.sync="roleUserInfo.listQuery.pagerows"
              @pagination="updataPage"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="selectMember">
            <div v-if="selectMember.length > 0">
              <div v-for="(item,index) in selectMember" :key="index">
                <span>{{ item.loginName }}</span>
              </div>
            </div>
            <span v-else class="nullData">暂无数据</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="AddMember">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserList,addRoleUser,getOrganTree } from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import {
  memberConfig,
  AddMemberConfig
} from '@/data/authority-management'
export default {
  components: {
    ListTable,
    Pagination,
    TreeBar
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
    selectRole:{
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
      id: 'addMember',
      formData: {}, // 弹窗表单
      keyword: '',
      content: '',
      id: 'member',
      selectMember: [],
      list: [],
      treeData: {
        title: '',
        list: []
      },
      memberConfig,
      AddMemberConfig,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      sysDeptId: ''
    }
  },
  created() {
    this.total = this.roleUserInfo.total
    // 获取左侧部门树
    this.getTree()
  },
  methods: {
    // 分页触发
    updataPage(_data) {
      this.$emit("updataPage",_data,2)
    },
    closeDialog() {
      this.keyword = ''
      this.content = ''
      this.sysDeptId = ''
      this.$emit('closeDialog')
    },
    openDialog() {

    },
    deleteClick() {

    },
    editSubmit() {

    },
    // 关键字搜索
    keywordSearch(val) {
      console.log(val);
      if(val){
        for(let _t in this.treeData.list){
          this.getDeptId(this.treeData.list[_t],val);
        }
      }
      this.getTree(this.sysDeptId);
      // this.$emit('keywordSearch',this.sysDeptId)
    },
    getDeptId(_data,val){
      if(_data.label.indexOf(val) != -1){
        this.sysDeptId = _data.value
        return false;
      }
      if(!!_data.children){
        for(let _t in _data.children){
          this.getDeptId(_data.children[_t],val);
        }
      }
    },
    getTree(val){
      let sysDeptId = val
      getOrganTree(sysDeptId).then(response => {
        console.log(response.data)
        console.log(response);
        this.treeData.list = response.data
        this.sysDeptId = ''
      })
    },
    // 工号、姓名、登录名搜索
    contentSearch() {
      this.$emit('contentSearch', this.content)
    },
    selectionChange(row) {
      this.selectMember = row
    },
    handleNodeClick(data) {
      this.$emit("treeClick",data)
      console.log(data)
    },
    // 点击添加角色用户
    AddMember() {
      console.log(this.selectMember);
      let sysUserIds = [];
      for(let _s of this.selectMember){
        sysUserIds.push(_s.sysUserId);
      }
      const query= {
        sysRoleId: this.selectRole.sysRoleId,
        sysUserIds: sysUserIds
      }
      addRoleUser(query).then(response => {
        console.log(response);
        this.$emit('closeDialog')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .tree-container {
    margin-top: 16px;
    // border-right: 2px solid #ccc;
  }

  .grid-content {
    padding-right: 2px;
    border-right: 2px solid #ccc;

    .el-table {
      width: calc(100% - 14px);
      margin-top: 10px;
      margin-left: 14px;
    }
    .pagination-container{
      padding: 32px 16px 32px 6px;
    }
  }
  .selectMember{
    text-indent: 2em;
    .nullData{
      display: inline-block;
    }
  }
  .row-bg{
    .el-input__inner{
      height: 36px;
    }
    .memberSearch{
      .el-button{
        padding: 10px 20px;
      }
    }
  }

</style>
