<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog">
    <div>
      <el-row class="tip" v-if="!!tipVisible">
        <el-col :span="22" style="text-indent: 4px;">
          <i class="el-icon-warning-outline"></i>
          <span> 单击【确定】按钮后，会对模块、按钮、数据授权进行统一保存</span>
        </el-col>
        <el-col :span="2"><span style="cursor: pointer;" @click="understand">知道了</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
            <el-menu-item index="1">
              <span slot="title">模块授权</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">按钮授权</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">数据授权</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" class="empower">
          <div v-if="!!moduleVisible">
            <tree-bar :tree-data="treeData1" @extend-click="treeExtend = !treeExtend" />
          </div>
          <div v-if="!!buttonVisible">
            <div class="buttons">
              <el-button type="success" @click="createEmpower">创建</el-button>
              <el-button type="primary" :disabled="updateDisabled" @click="updateClick">编辑</el-button>
              <el-button type="danger" :disabled="deleteDisabled" @click="deleteClick">删除</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @selection-change="selectionChange">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column prop="name" label="名称" sortable width="180">
              </el-table-column>
              <el-table-column prop="type" label="类型" sortable width="180">
              </el-table-column>
              <el-table-column prop="identification" label="标识">
              </el-table-column>
            </el-table>
          </div>
          <div v-if="!!dataVisible">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="数据源">
                <el-select v-model="dataSource" placeholder="默认数据源" @change="sourceChange">
                  <el-option v-for="(item,index) in sourceList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="empowerSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import TreeBar from '@/components/TreeBar'
  import {
    memberConfig
  } from '@/data/authority-management'
  export default {
    components: {
      TreeBar,
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
        input: '',
        id: 'member',
        memberConfig,
        listLoading: false,
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        },
        tipVisible: true,
        moduleVisible: true,
        buttonVisible: false,
        dataVisible: false,
        dataSource: '',
        sourceList: [{
          value: 'one',
          label: "顾桥煤矿一"
        }, {
          value: 'two',
          label: "顾桥煤矿二"
        }],
        formInline: {
          user: '',
          region: ''
        },
        checkList: [],
        updateDisabled: true,
        deleteDisabled: true,
        selectData: [],
        tableData: [{
          id: 1,
          name: '全息一张图',
          type: '页面',
          identification: '',
          children: [{
            id: 11,
            name: '创建',
            type: '按钮',
            identification: 'create',
          }, {
            id: 12,
            name: '修改',
            type: '按钮',
            identification: 'update',
          }, {
            id: 13,
            name: '删除',
            type: '按钮',
            identification: 'delete',
          }]
        }, {
          id: 2,
          name: '地址地形图',
          type: '页面',
          identification: '',
          children: [{
            id: 21,
            name: '新建文件夹',
            type: '按钮',
            identification: 'create',
          }, {
            id: 22,
            name: '修改文件夹',
            type: '按钮',
            identification: 'update',
          }, {
            id: 23,
            name: '删除文件夹',
            type: '按钮',
            identification: 'delete',
          }]
        }, {
          id: 3,
          name: '地址图片',
          type: '页面',
          identification: '',
          children: [{
            id: 31,
            name: '新增图片',
            type: '按钮',
            identification: 'create'
          }, {
            id: 32,
            name: '删除图片',
            type: '按钮',
            identification: 'delete'
          }]
        }],
        treeData: {
          title: '授权机构',
          checkbox: true,
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
                  }, {
                    label: '财务科',
                    children: [{
                      label: '财务科科直'
                    }, {
                      label: '财务科科员'
                    }]
                  }, {
                    label: '企业管理科',
                    children: [{
                      label: '企业管理科科直'
                    }, {
                      label: '企业管理科科员'
                    }]
                  }
                ]
              }

            ]
          }]
        },
        treeData1: {
          title: '',
          checkbox: true,
          list: [{
            label: '门户页面子系统权限'
          }, {
            label: '全息一张图'
          }, {
            label: '地质技术资料',
            children: [{
              label: '钻孔成果卡片'
            }, {
              label: '地质构造素描卡片'
            }, {
              label: '并筒石门见煤点柱状卡片'
            }, {
              label: '地质专业的业务规程'
            }, {
              label: '理论知识'
            }, {
              label: '培训教材'
            }, ]
          }, {
            label: '申请人申请'
          }, {
            label: '申请单位审批'
          }, {
            label: '分管领导审批'
          }, {
            label: '矿主要领导审批'
          }]
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
      // this.total = this.tableData.length;
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
        this.$emit('membersVisible')
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      understand() {
        this.tipVisible = false;
      },
      handleSelect(key, keyPath) {
        if (key == 1) {
          this.moduleVisible = true;
          this.buttonVisible = false;
          this.dataVisible = false;
          this.checkList = [];
        } else if (key == 2) {
          this.moduleVisible = false;
          this.dataVisible = false;
          this.buttonVisible = true;
        } else if (key == 3) {
          this.moduleVisible = false;
          this.buttonVisible = false;
          this.dataVisible = true;
        }
      },
      createEmpower() {
        this.$message({
          message: '恭喜你，创建成功',
          type: 'success'
        });
      },
      deleteClick() {
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        });
      },
      selectionChange(val) {
        console.log(val);
        this.selectData = val;
        if (val.length > 0) {
          this.deleteDisabled = false;
          if (val.length == 1) {
            this.updateDisabled = false;
          } else {
            this.updateDisabled = true;
          }
        }
      },
      updateClick() {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        // this.$emit("updateClick",this.selectData[0]);
      },
      empowerSubmit() {
        if (!!this.moduleVisible) {
          this.$message({
            message: '模块授权成功',
            type: 'success'
          });
        } else if (!!this.buttonVisible) {
          this.$message({
            message: '按钮授权成功',
            type: 'success'
          });
        } else if (!!this.dataVisible) {
          this.$message({
            message: '数据授权成功',
            type: 'success'
          });
        }
        this.$emit('closeDialog')
      },
      sourceChange(val){
        console.log(val);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tip {
    width: calc(100% - 40px);
    margin: 10px auto 0;
    background-color: #ccc;
    padding: 10px 0;
  }

  .el-row {
    margin-top: 14px;
  }

  .empower {
    margin-left: 24px;

    .el-checkbox-group {
      .el-checkbox {
        display: block;
        margin-bottom: 16px;
      }
    }

    .buttons {
      margin-bottom: 10px;

      .el-button {
        width: 88px;
        height: 36px;
      }
    }
  }
</style>
