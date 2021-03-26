<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'"
    :before-close="closeDialog">
    <div style="width: calc(100% - 40px);margin: 20px auto 0;">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-input prefix-icon="el-icon-search" v-model="keyword" @change="keywordSearch" placeholder="请输入关键字">
          </el-input>
        </el-col>
        <el-col :span="12" class="memberSearch">
          <div style="float: right;">
            <el-input style="display: inline-block;width: 220px;" v-model="content" placeholder="工号、姓名、登录名"></el-input>
            <el-button style="display: inline-block;margin-left: 14px;" @click="contentSearch" type="primary">搜索
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
            <list-table :id="id" :list="list" :list-loading="listLoading" :config="AddMemberConfig"
              @edit-click="(row) => openDialog('edit', row)" @delete-click="deleteClick"
              @selectionChange="selectionChange" @submit-data="editSubmit"/>

            <!-- <el-pagination class="page"
                :total="50"
                 @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper">
              </el-pagination> -->
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
              @pagination="updataForm" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="selectMember">
            <div v-if="selectMember.length > 0">
              <div v-for="(item,index) in selectMember" :key="index">
                <span>{{item.loginName}}-{{item.department}}</span>
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
        selectMember:[],
        list: [{
          name: '李四',
          loginName: '李四',
          department: '软件部',
          addDate: '2021-3-22 16:40'
        }, {
          name: '王菲',
          loginName: '王菲',
          department: '实施部',
          addDate: '2021-3-22 16:40'
        }, {
          name: '赵四',
          loginName: '赵四',
          department: '实施部',
          addDate: '2021-3-22 16:40'
        }, {
          name: '王五',
          loginName: '王五',
          department: '软件部',
          addDate: '2021-3-22 16:40'
        }],
        treeData: {
          title: '',
          list: [{
            label: '顾桥煤矿',
            children: [{
                label: '机关',
                children: [{
                    label: '矿领导'
                  },
                  {
                    label: '办公室',
                    children: [{
                        label: '部门'
                      },
                      {
                        label: '办公室科直'
                      },
                      {
                        label: '办公室职员'
                      },
                      {
                        label: '办公室小车班'
                      }
                    ]
                  }
                ]
              }

            ]
          }]
        },
        memberConfig,
        AddMemberConfig,
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
      closeDialog() {
        this.$emit('closeDialog');
      },
      openDialog() {

      },
      deleteClick() {

      },
      editSubmit() {

      },
      // 关键字搜索
      keywordSearch(val) {
        if(!!val){
          this.$emit("keywordSearch", val)
        }
      },
      // 工号、姓名、登录名搜索
      contentSearch() {
        if (!!this.content) {
          this.$emit("contentSearch", this.content)
        }
      },
      selectionChange(row) {
        console.log(row);
        this.selectMember = row;
        // for(let b of row){
        //   console.log(b.loginName,b.department);
        // }
      },
      handleNodeClick(data) {
        console.log(data);
      },
      AddMember(){
        // this.$message({
        //   message: '恭喜你，添加成功',
        //   type: 'success'
        // });
        this.$emit('closeDialog');
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
