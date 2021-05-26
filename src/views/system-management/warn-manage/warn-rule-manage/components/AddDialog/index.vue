<template>
  <div>
    <el-dialog title="规则集定义" :visible.sync="dialogVisible" width="900px" class="operation-file-dialog" :before-close="closeDialog">
      <el-form ref="ruleInfo" class="dialog-container" :rules="rules" :model="ruleInfo" label-width="120px" :inline="true">
        <el-form-item label="规则名称:" prop="definitionName">
          <el-input v-model="ruleInfo.definitionName" class="form-item"></el-input>
        </el-form-item>
        <el-form-item label="规则编码:" prop="definitionCode">
          <el-input v-model="ruleInfo.definitionCode" class="form-item"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-switch v-model="ruleInfo.definitionStatus" class="form-item" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="优先级:" prop="grade">
          <el-select v-model="ruleInfo.grade" placeholder="请选择" class="form-item">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提醒目标:" prop="definitionTarget">
          <el-input v-model="ruleInfo.definitionTarget" class="form-item" @focus="textFocus"></el-input>
        </el-form-item>
        <el-form-item label="开启时间:" prop="beginTime">
          <el-date-picker v-model="ruleInfo.beginTime" type="date" placeholder="选择日期" class="form-item">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关闭时间:" prop="endTime">
          <el-date-picker v-model="ruleInfo.endTime" type="date" placeholder="选择日期" class="form-item">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="指标:" prop="quota">
          <el-input v-model="ruleInfo.quota" class="form-item"></el-input>
        </el-form-item>
        <el-form-item label="判定条件:" class="judgingCondition">
          <div v-for="(item,index) in this.ruleInfo.jcs" :key="index">
            <el-row :gutter="20" style="margin-bottom: 12px;">
              <el-col :span="5">
                <el-select v-model="item.connect" placeholder="请选择" clearable>
                  <el-option v-for="item in condition" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select v-model="item.key.node" placeholder="请选择" clearable>
                  <el-option v-for="item in selectList.targetList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select v-model="item.condition" placeholder="请选择" clearable>
                  <el-option v-for="item in operator" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="value">
                  <el-input v-model="item.value" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div style="display: inline-block;" @click="addCondition">
                  <i class="el-icon-plus"></i>
                </div>
                <div style="display: inline-block;margin-left: 16px;" @click="delCondition(item,index)">
                  <i class="el-icon-minus"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="处理描述:" prop="pdn">
          <el-input v-model="ruleInfo.pdn" type="textarea" style="width:595px;" :rows="2" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="预警告模板:" prop="gzyqFormworkId">
          <el-select v-model="ruleInfo.gzyqFormworkId" placeholder="请选择" class="form-item">
            <el-option v-for="item in selectList.templateList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="createRule('ruleInfo')">创建</el-button>
      </span>
    </el-dialog>
    <!-- 添加人员 -->
    <add-personnel
      ref="addPersonnel"
      :config="initAddMemberConfig()"
      :dialog-visible="addMembersVisible"
      @closeDialog="addMembersVisible = false"
      @add-personne="addPersonne"
    />
  </div>
</template>
<script>
  import AddPersonnel from '@/components/AddPersonnel'
  import { memberConfig, memberFilterConfig } from '@/data/authority-management'
  export default {
    components: {AddPersonnel},
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: () => ({})
      },
      selectList: {
        type: Object,
        default: () => ({})
      },
      ruleInfo: {
        type: Object,
        default: () => ({})
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        addMembersVisible: false,
        memberConfig,
        memberFilterConfig,
        rules: {
          definitionName: [{
            required: true,
            message: '请输入规则名称',
            trigger: 'blur'
          }],
          definitionCode: [{
            required: true,
            message: '请输入规则编码',
            trigger: 'blur'
          }],
          grade: [{
            required: true,
            message: '请选择优先级',
            trigger: 'blur'
          }],
          definitionTarget: [{
            required: true,
            message: '请选择提醒目标',
            trigger: 'blur'
          }],
          beginTime: [{
            required: true,
            message: '请选择开启时间',
            trigger: 'blur'
          }],
          endTime: [{
            required: true,
            message: '请选择关闭时间',
            trigger: 'blur'
          }],
          quota: [{
            required: true,
            message: '请填写指标',
            trigger: 'blur'
          }],
          pdn: [{
            required: true,
            message: '请填写处理描述',
            trigger: 'blur'
          }],
          gzyqFormworkId: [{
            required: true,
            message: '请选择预警告模板',
            trigger: 'blur'
          }]
        },
        options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],
        condition: [{
          value: '空置',
          label: '空置'
        }, {
          value: '并且',
          label: '并且'
        }, {
          value: '或者',
          label: '或者'
        }, {
          value: '内嵌开始',
          label: '内嵌开始'
        }, {
          value: '内嵌结束',
          label: '内嵌结束'
        }],
        operator: [{
          value: '等于',
          label: '等于'
        }, {
          value: '大于',
          label: '大于'
        }, {
          value: '大于等于',
          label: '大于等于'
        }, {
          value: '小于等于',
          label: '小于等于'
        }, {
          value: '小于',
          label: '小于'
        }, {
          value: '包含',
          label: '包含'
        }, {
          value: '不包含',
          label: '不包含'
        }, {
          value: '不等于',
          label: '不等于'
        }],
      }
    },
    created() {},
    methods: {
      closeDialog() {
        this.$emit('close-dialog')
      },
      createRule(ruleInfo) {
        this.$refs[ruleInfo].validate((valid) => {
          console.log(valid);
          if (valid) {
            this.ruleInfo.beginTime = this.dateConversion(this.ruleInfo.beginTime)
            this.ruleInfo.endTime = this.dateConversion(this.ruleInfo.endTime)
            console.log(this.ruleInfo);
            this.ruleInfo.jcs.forEach(it => {
              if (!!it.key.node || it.key.node == 0) {
                this.selectList.targetList.forEach(con => {
                  if (it.key.node == con.value) {
                    it.key.nodeValue = con.label
                  }
                })
              }
            })
            this.$emit('create-submit', this.ruleInfo)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dateConversion(data) {
        var d = new Date(data);
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return datetime
      },
      addCondition() {
        this.ruleInfo.jcs.push({
          connect: "",
          key: {
            node: "",
            nodeValue: "",
          },
          condition: "",
          value: ""
        })
        console.log(this.ruleInfo);
      },
      delCondition(item, index) {
        if(this.ruleInfo.jcs.length > 1){
          this.ruleInfo.jcs.splice(index,1)
        }
      },
      textFocus() {
        this.$refs.addPersonnel.keywordSearch()
        this.addMembersVisible = true
      },
      addPersonne(userNames, userIds) {
        this.ruleInfo.definitionTarget = userNames.join()
        this.ruleInfo.definitionTargetId = userIds.join()
        this.addMembersVisible = false
      },
      // 初始化表格窗口配置
      initAddMemberConfig() {
        const createConfig = Object.assign({
          title: '选择用户',
          width: '1000px',
          type: 'addMember',
          filter: this.memberFilterConfig,
          form: this.memberConfig
        })
        return createConfig
      },
    }
  }
</script>
<style lang="scss" scoped>
  .form-item {
    width: 233px;
  }
</style>
<style lang="scss">
  .dialog-container {
    .judgingCondition {
      .el-form-item__content {
        width: 85%;
      }
    }
  }
</style>
