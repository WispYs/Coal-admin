<template>
  <el-table
    :id="id"
    v-loading="listLoading"
    :data="normalizedList"
    element-loading-text="Loading"
    border
    fit
    :show-summary="config.summary"
    :summary-method="(param) => getSummaries(param, config.summaryField)"
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
  >
    <el-table-column align="center" label="序号" width="95" fixed>
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="column in config.columns"
      :key="column.field"
      :label="column.label"
      :width="column.width"
      :align="column.align || 'center'"
      :prop="column.field"
      :sortable="column.sortable"
    >
      <template slot-scope="scope">
        <template v-if="config.inlineEdit && scope.row.edit">
          <!-- input -->
          <el-input v-if="column.layout === 'Text'" v-model="scope.row[column.field]" size="small" :placeholder="column.placeholder" />

          <!-- select  -->
          <el-select
            v-if="column.layout === 'Select'"
            v-model="scope.row[column.field]"
            :placeholder="column.placeholder"
            style="width: 100%;"
            size="small"
          >
            <el-option
              v-for="it in column.options"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>

          <!-- tree-select  -->
          <tree-select
            v-if="column.layout === 'TreeSelect'"
            :value="scope.row[column.field]"
            :placeholder="column.placeholder"
            :options="column.options"
            :clearable="true"
            :accordion="false"
            @getTreeSelect="getTreeSelect"
          />

          <!-- date-picker  -->
          <el-date-picker
            v-if="column.layout === 'DateTime'"
            v-model="scope.row[column.field]"
            :value-format="column.dateFormat || 'yyyy-MM-dd'"
            type="date"
            :placeholder="column.placeholder"
            style="width: 100%;"
            size="small"
          />

          <!-- slider  -->
          <el-slider v-if="column.layout === 'Slider'" v-model="scope.row[column.field]" />

          <!-- switch -->
          <el-switch v-if="column.layout === 'Switch'" v-model="scope.row[column.field]" />

          <!-- radio -->
          <el-radio-group v-if="column.layout === 'Radio'" v-model="scope.row[column.field]" size="mini">
            <el-radio-button v-for="it in column.options" :key="it.value" :label="it.label" />
          </el-radio-group>

          <!-- checkbox -->
          <el-checkbox-group v-if="column.layout === 'Checkbox'" v-model="scope.row[column.field]" size="mini">
            <el-checkbox-button v-for="it in column.options" :key="it.value" :label="it.label" :name="it.value" />
          </el-checkbox-group>

          <!-- textarea -->
          <el-input v-if="column.layout === 'Textarea'" v-model="scope.row[column.field]" type="textarea" :placeholder="column.placeholder" />

        </template>
        <template v-else>
          <!-- showType 有值表示对表格内样式有特殊要求 -->
          <template v-if="column.showType === 'colorLump'">
            <span class="color-lump" :class="lumpClassName(scope.row[column.field])">{{ filterField(column.options, scope.row[column.field]) }}</span>
          </template>
          <template v-else-if="column.showType === 'underline'">
            <span class="file-text" @click="fileTextClick">{{ scope.row[column.field] }}</span>
          </template>
          <template v-else>
            <span v-if="column.options">
              {{ filterField(column.options, scope.row[column.field]) }}
            </span>
            <span v-else>{{ scope.row[column.field] }}</span>

          </template>

        </template>
      </template>
    </el-table-column>
    <el-table-column v-if="config.actions && config.actions.length > 0" fixed="right" label="操作" width="160" align="center">
      <template slot-scope="scope">
        <template v-if="config.actions.indexOf('other') > -1">
          <el-button v-for="item in config.otherActionTitle" :key="item" type="text" size="small" @click="otherClick(scope.row, scope.$index)">{{ item }}</el-button>
        </template>
        <el-button v-if="config.actions.indexOf('upload') > -1" type="text" size="small" @click="uploadFile(scope.row, scope.$index)">附件</el-button>
        <el-button v-if="config.actions.indexOf('preview') > -1" type="text" size="small" @click="handleClick(scope.row, scope.$index)">查看</el-button>
        <el-button v-if="config.actions.indexOf('edit') > -1 && !scope.row.edit" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button v-if="config.actions.indexOf('edit') > -1 && scope.row.edit" type="text" style="color: #67c23a" size="small" @click="submitRow(scope.row)">提交</el-button>
        <el-button v-if="config.actions.indexOf('edit') > -1 && scope.row.edit" type="text" style="color: #e6a23c" size="small" @click="cancelSubmit(scope.row)">取消</el-button>
        <el-button v-if="config.actions.indexOf('delete') > -1" type="text" size="small" style="color: #f56c6c" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TreeSelect from '@/components/TreeSelect'

export default {
  components: { TreeSelect },
  props: {
    id: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // list 数据中添加 edit 属性
    normalizedList() {
      let normalizedList = []
      if (this.list && this.config && this.config.inlineEdit) {
        normalizedList = this.list.map(it => {
          this.$set(it, 'edit', false)
          return it
        })
      } else normalizedList = this.list
      return normalizedList
    }
  },
  methods: {
    // filter 方法
    /**
     * @param {array}   options 字段对应配置项
     * @param {string}  field 过滤值
     */
    filterField(options, field) {
      // 判断值是不是数组
      // 暂不考虑传值为对象的情况（后续对接）
      if (field.constructor === Array) {
        const filters = []
        field.forEach(f => {
          filters.push(options.filter(item => item.value === f)[0].label)
        })
        return filters
      } else {
        const filters = options.filter(item => item.value === field)
        return filters[0] ? filters[0].label : ''
      }
    },
    // 色块样式类名
    lumpClassName(str) {
      const classMap = {
        1: 'green',
        2: 'blue',
        3: 'orange',
        4: 'red'
      }
      return classMap[str]
    },
    // 点击上传文件
    fileTextClick() {
      this.$emit('file-text-click')
    },
    // 上传附件
    uploadFile(row, index) {
      this.$emit('upload-click', row)
    },
    // 查看
    handleClick(row, index) {
      this.$message.success('查看信息')
      console.log(row, index)
    },
    otherClick(row, index) {
      this.$emit('other-click', row)
    },
    // 编辑
    edit(row) {
      if (this.config && this.config.inlineEdit) {
        console.log(row)
        row.edit = true
      } else {
        this.$emit('edit-click', row)
      }
    },
    // 提交编辑后的行内数据
    async submitRow(row) {
      console.log(row)
      row.edit = false
      // 提交数据时，删除 edit 属性
      delete row.edit
      await this.$emit('submit-data', row)
      // 刷新数据
      this.$emit('update')
    },
    cancelSubmit(row) {
      this.$emit('update')
    },
    // 删除
    del(id) {
      this.$emit('delete-click', id)
    },

    // treeSelect 值改变
    getTreeSelect(value) {
      console.log(value)
    },
    // 计算合计总工时
    getSummaries(param, field) {
      if (!field) {
        return false
      }
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        field.forEach((it, i) => {
          if (data && column.property === it) {
            const values = data.map(item => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              const prevNum = Number(prev)
              if (!isNaN(value)) {
                return prevNum + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        })
      })
      return sums
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
  .color-lump {
    padding: 10px 20px;
    color: $whiteColor;
    &.green {
      background: $greenColor;
    }
    &.blue {
      background: $primaryColor;
    }
    &.orange {
      background: $orangeColor;
    }
    &.red {
      background: $redColor;
    }
  }
  .file-text {
    color: $primaryColor;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
