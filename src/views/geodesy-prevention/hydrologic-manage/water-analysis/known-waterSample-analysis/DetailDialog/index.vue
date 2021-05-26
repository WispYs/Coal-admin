<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
    class="detail-dialog"
  >
    <div style="padding: 20px;height: 100%">
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="config.form" height="90px" />
    </div>
  </el-dialog>
</template>
<script>
import {
  getZwitterionList
} from '@/api/geodesy-prevention'
import ListTable from '@/components/ListTable'

export default {
  components: {
    ListTable
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
  },
  data() {
    return {
      id: 'large-equip-detail',
      list: [],
      listLoading: true
    }
  },
  created() {},
  methods: {
    __fetchData(Parame) {
      this.listLoading = true
      const query = {
        entity: {
          dcfzsWaterInfoId: Parame.dcfzsWaterInfoId
        },
        page: 1,
        pagerows: 10
      }
      getZwitterionList(query).then(response => {
        this.listLoading = false
        response.data.rows[0].hNoName = Parame.hscNoName
        response.data.rows[0].qycw = Parame.qycw
        this.list = response.data.rows
        this.total = Number(response.data.records)
      }).catch(err => {
        this.listLoading = false
      })
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
