<template>
  <div>
    <el-dialog
      :title="config.title"
      :visible.sync="dialogVisible"
      :width="config.width || '500px'"
      :before-close="closeDialog"
    >
      <div class="dialog-container">
        <el-form ref="formData" :model="formData" :rules="formRules" label-width="200px" size="medium" :inline="true">
          <template v-for="(item, index) in config.form">
            <el-form-item
              v-if="!item.immutable"
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
              <el-input v-if="item.layout === 'SelectUser'" v-model="formData[item.field]" :class="item.fullLine ? 'form-block' : 'form-inline'" :placeholder="item.placeholder" :disabled="item.disabled" @focus="selectUser(item, formData[item.field], formData[item.subField])">
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

              <!-- text editor：tinymce -->
              <tinymce
                v-if="item.layout === 'TextEditor'"
                ref="tinymce"
                v-model="formData[item.field]"
                :height="300"
                :toolbar="item.textEditorToolbar || defaultToolbar"
                :disabled="item.disabled"
                @submit-text-editor="value => submitTextEditor(value,item.field)"
              />
              <span v-if="item.message" class="naozhewan">{{ item.message }}</span>
            </el-form-item>
          </template>
        </el-form>
        <div>
          <list-table
            :list="list"
            :list-loading="listLoading"
            :config="HandleTaskTableConfig"
          />
        <!-- <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        /> -->
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :loading="submitLoading" type="primary" size="medium" @click="onSubmit">提 交</el-button>
        <el-button size="medium" @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { getHandleTaskList } from '@/api/flow-management'
import TreeSelect from '@/components/TreeSelect'
import Tinymce from '@/components/Tinymce'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { getType } from '@/utils'
import { HandleTaskTableConfig } from '@/data/flow-management'
const defaultToolbar = ['fontsizeselect fontselect forecolor backcolor  bold italic underline strikethrough removeformat undo redo']

export default {
  components: { TreeSelect, Tinymce, ListTable, Pagination },
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
    },
    // 任务id
    taskId: {
      type: String,
      default: () => ''
    },
    // 业务id
    businessId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      HandleTaskTableConfig,
      listLoading: true,
      submitLoading: false, // 提交按钮loading状态
      formData: {}, // 弹窗表单
      formRules: {},
      currentKey: '', // 动态字段 - 处理方式字段key
      fileMap: {}, // 存储附件url地址
      defaultToolbar // 富文本编辑器默认工具栏配置
    }
  },
  watch: {
    config: {
      handler(val) {
        val.form.forEach(it => {
          if (it.field === 'outcomes') {
            // 存储动态字段 - 处理方式字段key
            this.currentKey = it.options.length > 0 ? it.options[0].key : ''
          }
        })
      },
      immediate: true,
      deep: true
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
    // 获取批注信息
    __fetchData() {
      this.listLoading = true

      getHandleTaskList({ taskId: this.taskId }).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        // this.total = Number(response.data.records)
      })
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
      this.resetSubmitBtn()
      this.$nextTick(() => {
        this.$refs.formData.resetFields()
      })

      // 清空 TreeSelect 组件数据
      const treeSelectComponents = this.$refs.treeSelect
      if (treeSelectComponents) {
        treeSelectComponents.forEach(it => {
          it.clearHandle()
        })
      }
      // 清空 tinymce 组件数据
      const tinymceComponents = this.$refs.tinymce
      if (tinymceComponents) {
        tinymceComponents.forEach(it => {
          it.setContent('')
        })
      }
      // 清空上传附件组件数据
      Object.keys(this.fileMap).forEach(key => { this.fileMap[key] = '' })
    },

    radioChange(item, row) {
      console.log(item, row)
    },

    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          let info = {}
          if (this.currentKey) {
            info = Object.assign(this.formData, {
              taskId: this.taskId,
              id: this.businessId,
              key: this.currentKey,
              value: this.formData.outcomes
            })
          } else {
            info = Object.assign(this.formData, {
              taskId: this.taskId,
              id: this.businessId
            })
          }

          delete info.outcomes
          this.$emit('submit', info)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.resetForm()
      this.$emit('close-dialog')
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
