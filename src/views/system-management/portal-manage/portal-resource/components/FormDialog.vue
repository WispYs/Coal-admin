<template>
  <div>
    <el-dialog
      :title="config.title"
      :visible.sync="dialogVisible"
      :width="config.width || '500px'"
      :before-close="closeDialog"
    >
      <el-form ref="formData" class="dialog-container" :model="formData" :rules="formRules" label-width="200px" size="medium" :inline="true">
        <template v-for="(item, index) in config.form">
          <el-form-item
            v-if="!item.immutable && isAssociate(item)"
            :key="index"
            :class="item.layout === 'Textarea' || item.layout === 'Upload' || item.layout === 'TextEditor' || item.fullLine ? 'full-line' : ''"
            :label="`${item.label}：`"
            :prop="item.field"
          >
            <!-- input -->
            <el-input v-if="item.layout === 'Text'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :placeholder="item.placeholder" :disabled="item.disabled">
              <template v-if="item.unit" slot="append">{{ item.unit }}</template>
            </el-input>

            <!-- input SelectUser -->
            <el-input v-if="item.layout === 'SelectUser'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :placeholder="item.placeholder" :disabled="item.disabled" @focus="textFocus(item)">
              <template v-if="item.unit" slot="append">{{ item.unit }}</template>
            </el-input>

            <!-- number -->
            <el-input-number v-if="item.layout === 'Number'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" controls-position="right" :placeholder="item.placeholder" :disabled="item.disabled" />

            <!-- select  -->
            <el-select
              v-if="item.layout === 'Select'"
              v-model="formData[item.field]"
              :class="item.fullLine ? 'form-block' : 'form-inline'"
              :multiple="item.multiple"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              @focus="selectFocus(item)"
              @change="(row) => selectChange(item,row)"
            >
              <el-option
                v-for="it in item.options"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>

            <!-- tree-select  -->
            <tree-select
              v-if="item.layout === 'TreeSelect'"
              ref="treeSelect"
              :class="item.fullLine ? 'form-block' : 'form-inline'"
              :value="formData[item.field]"
              :placeholder="item.placeholder"
              :options="item.options"
              :clearable="true"
              :accordion="false"
              :disabled="item.disabled"
              @tree-select="value => getTreeSelect(value,item.field)"
            />

            <!-- date-picker  -->
            <el-date-picker
              v-if="item.layout === 'DateTime'"
              v-model="formData[item.field]"
              :class="item.fullLine ? 'form-block' : 'form-inline'"
              :value-format="formData[item.dateFormat] || 'yyyy-MM-dd'"
              type="date"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            />

            <!-- slider  -->
            <el-slider v-if="item.layout === 'Slider'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :disabled="item.disabled" />

            <!-- switch -->
            <el-switch v-if="item.layout === 'Switch'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :disabled="item.disabled" />

            <!-- radio -->
            <el-radio-group
              v-if="item.layout === 'Radio'"
              v-model="formData[item.field]"
              :class="item.fullLine ? 'form-block' : 'form-inline'"
              :disabled="item.disabled"
              @change="(row) => radioChange(item,row)"
            >
              <el-radio-button v-for="it in item.options" :key="it.value" :label="it.value">{{ it.label }}</el-radio-button>
            </el-radio-group>

            <!-- checkbox -->
            <el-checkbox-group v-if="item.layout === 'Checkbox'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :disabled="item.disabled">
              <el-checkbox v-for="it in item.options" :key="it.value" :label="it.value">{{ it.label }}</el-checkbox>
            </el-checkbox-group>

            <!-- textarea -->
            <el-input
              v-if="item.layout === 'Textarea'"
              v-model="formData[item.field]"
              type="textarea"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              style="width: 100%"
            />

            <!-- upload -->
            <div v-if="item.layout === 'Upload'">
              <div v-if="formData[item.field]">
                <el-tooltip v-for="img in fileMap[item.field]" :key="img.eventId" effect="light" :content="img.fileName" placement="top">
                  <div class="upload-img-wrapper" @click="download(img.url)">
                    <img class="upload-img" :src="img.imgUrl" alt="">
                    <i class="el-icon-close delete-icon" @click.stop="delImg(img, item.field)" />
                  </div>
                </el-tooltip>
              </div>
              <el-button type="primary" size="medium" :disabled="item.disabled" @click="uploadFile(item.field)">上传附件</el-button>
            </div>

            <span v-if="item.message" class="naozhewan">{{ item.message }}</span>
          </el-form-item>

        </template>
        <el-form-item v-if="layoutTemplate" label="模板预览：" class="full-line">
          <template v-for="(it, index) in templateModel">
            <div v-if="layoutTemplate === it.value" :key="index">
              <component :is="it.component" />
            </div>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="submitLoading" type="primary" size="medium" @click="onSubmit">提交</el-button>
        <el-button size="medium" @click="closeDialog">取消</el-button>
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
import TreeSelect from '@/components/TreeSelect'
import { getType } from '@/utils'
import AddPersonnel from '@/components/AddPersonnel'
import { memberConfig, memberFilterConfig } from '@/data/authority-management'
import LineChartLayout from './LineChartLayout'
import BarChartLayout from './BarChartLayout'
import PieChartLayout from './PieChartLayout'
import ListLayout1 from './ListLayout1'
import ListLayout2 from './ListLayout2'
import NumberLayout1 from './NumberLayout1'
import NumberLayout2 from './NumberLayout2'
import NumberLayout3 from './NumberLayout3'
import NavBoard from './NavBoard'
import WeatherLayout from './WeatherLayout'

export default {
  components: {
    TreeSelect,
    AddPersonnel,
    LineChartLayout,
    BarChartLayout,
    PieChartLayout,
    NumberLayout1,
    NumberLayout2,
    NumberLayout3,
    ListLayout1,
    ListLayout2,
    NavBoard,
    WeatherLayout
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
    selectUpdateData: {
      type: Object,
      default: () => ({})
    }
    // 上传的图片
    // uploadImgs: {
    //   type: Array,
    //   default: () => []
    // }
    // 弹窗表单
    // formData: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  data() {
    return {
      submitLoading: false, // 提交按钮loading状态
      formData: {}, // 弹窗表单
      formRules: {},
      fileMap: {}, // 存储附件url地址
      memberConfig,
      memberFilterConfig,
      addMembersVisible: false, // 添加人员页是否显示
      layoutTemplate: '', // 展示模板
      // 模板列表，value表示模板Id
      templateModel: [
        { value: '1', component: LineChartLayout },
        { value: '2', component: BarChartLayout },
        { value: '3', component: PieChartLayout },
        { value: '4', component: ListLayout1 },
        { value: '5', component: ListLayout2 },
        { value: '6', component: NumberLayout1 },
        { value: '7', component: NumberLayout2 },
        { value: '8', component: NumberLayout3 },
        { value: '9', component: NavBoard },
        { value: '10', component: WeatherLayout }
      ]
    }
  },
  computed: {

  },
  watch: {
    formData: {
      handler(val) {
        this.layoutTemplate = val.templateId
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.formData = this.selectUpdateData
    const { form } = { ...this.config }
    const obj = {}
    const rules = {}

    form.forEach(item => {
      // 初始化表单数据类型
      // 方案一：获取options中的实例数据，判断数据类型
      // 方案二：直接在config表中添加type字段标记数据类型
      // 暂时采用方案一，尽量不在配置表中加字段，后续有问题修改
      if (item.options && item.options.length > 0) {
        // 获取options中的实例数据
        const exampleValue = item.options[0].value
        const type = getType(exampleValue)
        const typeMap = {
          'string': '',
          'array': [],
          'number': 1,
          'boolean': false,
          'null': null,
          'undefined': undefined
        }
        obj[item.field] = typeMap[type]
      } else {
        obj[item.field] = ''
      }

      if (item.require) {
        if (item.field === 'password') {
          rules[item.field] = [
            { required: item.require, message: item.placeholder, trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        } else {
          rules[item.field] = [
            { required: item.require, message: item.placeholder, trigger: 'blur' }
          ]
        }
      }
    })
    this.formData = Object.assign({}, obj)
    this.formRules = Object.assign({}, rules)

    // 获取config中的附件上传字段
    const fileFields = form.filter(it => it.layout === 'Upload')
    // 初始化fileMap用于存储每个附件字段的url
    fileFields.forEach(async it => {
      this.fileMap[it.field] = []
    })
    // eventHub.$on('open-dialog', dialogVisible => {
    //   this.dialogVisible = dialogVisible
    // })
  },
  methods: {
  // 针对某些关联字段是否显示
    isAssociate(column) {
      if (column.associate) {
        // 判断关联字段值是否和绑定值相等
        if (this.formData[column.associate.fields]) {
          return column.associate.value.indexOf(this.formData[column.associate.fields]) > -1
        }
        return false
      }
      return true
    },
    // 根据附件字段Id获取图片url
    getFileUrls(str) {
      if (str) {
        const eventId = str.split(',')
        return new Promise((resolve, reject) => {
          this.$store.dispatch('upload/getFileUrl', eventId).then((data) => {
            resolve(data)
          }).catch((err) => {
            reject(err)
          })
        })
      }
    },
    download(url) {
      window.open(url)
    },
    // 更新组件内 form 数据
    updataForm(form) {
      // 获取config中的附件上传字段
      const fileFields = this.config.form.filter(it => it.layout === 'Upload')
      // 初始化fileMap用于存储每个附件字段的url
      fileFields.forEach(async it => {
        // 根据id动态获取附件信息，存储在fileMap中
        this.fileMap[it.field] = await this.getFileUrls(form[it.field])
        // 数据层次太多，render函数没有自动更新，需手动强制刷新
        this.$forceUpdate()
      })
      this.formData = Object.assign(this.formData, form)
    },

    // 当提交失败的时候重置按钮状态
    resetSubmitBtn() {
      this.submitLoading = false
    },

    // 清空组件 form 数据
    resetForm() {
      this.layoutTemplate = ''
      this.resetSubmitBtn()
      this.$nextTick(() => {
        this.$refs.formData.resetFields()
      })

      const treeSelectComponents = this.$refs.treeSelect
      if (treeSelectComponents) {
        treeSelectComponents.forEach(it => {
          it.clearHandle()
        })
      }
    },

    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传附件
    uploadFile(field) {
      // 记录上传字段
      this.fileFields = field
      this.$emit('upload-click', this.formData)
    },
    // 更新上传附件
    updateFile(fileList) {
      const eventId = []
      fileList.forEach(f => {
        eventId.push(f.eventId)
      })
      this.$store.dispatch('upload/getFileUrl', eventId).then((data) => {
        // 当前上传的附件字段的url集合
        if (this.fileMap[this.fileFields] && this.fileMap[this.fileFields].length > 0) {
          this.fileMap[this.fileFields].push(...data)
          // 顺带更新formData附件字段的id集合
          this.formData[this.fileFields] += `,${eventId.join(',')}`
        } else {
          this.fileMap[this.fileFields] = data
          this.formData[this.fileFields] = eventId.join(',')
        }
        // 数据层次太多，render函数没有自动更新，需手动强制刷新
        this.$forceUpdate()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除图片
    delImg(img, field) {
      if (!img) return
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const idx = this.fileMap[field].findIndex(u => u.eventId === img.eventId)
        if (idx > -1) {
          this.fileMap[field].splice(idx, 1)
          const fileIds = this.formData[field].split(',')
          fileIds.splice(idx, 1)
          this.formData[field] = fileIds.join(',')
          // 数据层次太多，render函数没有自动更新，需手动强制刷新
          this.$forceUpdate()
        }
        this.$emit('delete-img', this.fileMap[field])
      }).catch((err) => {
        console.log(err)
      })
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.resetForm()
      this.$emit('close-dialog')
    },
    // treeSelect 值改变
    getTreeSelect(value, field) {
      this.formData[field] = Number(value) || 0
    },
    selectFocus(item) {
      this.$emit('select-focus', item)
    },
    selectChange(item, row) {
      console.log(item, row)
      // if (item.field === 'templateId') {
      //   this.layoutTemplate = row
      // }
      this.$emit('select-change', item, row, this.formData)
    },
    radioChange(item, row) {
      this.layoutTemplate = ''
      // 切换选项时清空相关联字段的值
      const field = item.field // 当前字段
      const form = this.config.form // 该form表单配置项
      const associateFields = form.filter(item => item.associate && item.associate.fields === field) // 与当前字段相关联的字段
      associateFields.forEach(item => {
        this.formData[item.field] = ''
      })
      this.$emit('redio-change', item, row, this.formData)
    },
    textFocus(item) {
      this.$refs.addPersonnel.keywordSearch()
      this.addMembersVisible = true
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
    addPersonne(userNames, userIds) {
      this.formData.copyUserName = userNames.join()
      this.formData.copyUserId = userIds.join()
      this.addMembersVisible = false
    }
  }
}
</script>
<style lang="scss">
.full-line {
  .el-form-item__label {
    float: left;
  }
  .el-form-item__content {
    display: block;
    margin-left: 200px;
  }
}
</style>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.full-line {
  display: block;
}
.file-title {
  margin: 0;
  font-size: 13px;
  line-height: 32px;
}
.form-inline {
  width: 200px;
}
.form-block {
  width: 100%;
}
.naozhewan {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  width: 80px;
  white-space: nowrap;
}
.upload-img-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin: 0 8px 10px 0;
  &:hover {
    .delete-icon {
      display: block;
    }
  }
  .upload-img{
    width: 100px;
    height: 100px;
  }
  .delete-icon{
    display: none;
    position: absolute;
    font-size: 20px;
    top: 0;
    right: 0;
    color: $redColor;
    cursor: pointer;
    font-weight: bold;
  }
}

</style>
