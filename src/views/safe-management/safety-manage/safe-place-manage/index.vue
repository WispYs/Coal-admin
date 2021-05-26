<template>
  <div
    v-loading.lock="gisLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="page-container"
  >
    <el-drawer
      v-show="!gisLoading"
      ref="drawer"
      :visible.sync="drawer"
      direction="ltr"
      :modal="false"
      :with-header="false"
      :wrapper-closable="false"
      class="drawer"
      size="100%"
    >
      <el-table
        :data="addrTableData"
        style="width: 100%"
        height="480"
      >
        <el-table-column
          v-for="(colum,idx) in AddrTableConfig.columns"
          :key="idx"
          :prop="colum.value"
          :label="colum.label"
          :width="colum.width || 80"
        />
      </el-table>
      <!-- <div class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          :small="true"
          layout="prev, pager, next"
          @pagination="__fetchData"
        />
      </div> -->
    </el-drawer>
    <TopBar
      v-if="!gisLoading"
      :config="topConfig"
      :options="gisMaps"
      @handleChange="mapChange"
    />

    <!-- 操作弹窗 -->
    <form-dialog
      ref="addAddrDialog"
      :config="initOperationConfig('新建')"
      :dialog-visible="addAddrDialogVisible"
      @close-dialog="addAddrDialogClose"
      @submit="addAddrSubmit"
    />

    <!-- 操作弹窗 -->
    <form-dialog
      ref="editAddrDialog"
      :config="initOperationConfig('编辑')"
      :dialog-visible="editAddrDialogVisible"
      @close-dialog="editAddrDialogVisible = false"
      @submit="editAddrSubmit"
    />
    <div id="gis-wrapper" class="gis-wrapper" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TopBar from '@/components/TopBar'
import { gisMixin } from '@/mixin/gis'
import { AddrTableConfig, AddAddrDialogConfig } from '@/data/safe-management'
import { getDictData, getAqglAddressList, saveObject, updateObject } from '@/api/safe-management'
export default {
  // 安全地点管理
  name: 'SafePlaceManage',
  components: { Pagination, TopBar, FormDialog },
  mixins: [gisMixin],
  data() {
    return {
      bussiness: 'aqglAddress',
      addAddrDialogVisible: false,
      editAddrDialogVisible: false,
      gisMaps: [
        {
          value: '0',
          label: '煤综合图1'
        },
        {
          value: '1',
          label: '煤综合图2'
        },
        {
          value: '2',
          label: '煤综合图3'
        }
      ],
      topConfig: [
        {
          name: '面板',
          status: true,
          fn: () => { this.drawer = !this.drawer },
          icon: 'el-icon-s-order'
        },
        {
          name: '添加地点',
          fn: () => { this.addAddrDialogVisible = true },
          icon: 'el-icon-map-location'
        },
        {
          name: '添加marker',
          fn: this.addAddr,
          icon: 'el-icon-add-location'
        },
        {
          name: '添加line',
          fn: this.addLine,
          icon: 'el-icon-edit'
        },
        {
          name: '图纸',
          type: 'Select',
          selectVal: '',
          selectFn: this.mapChange,
          options: [
            {
              value: '0',
              label: '煤综合图1'
            },
            {
              value: '1',
              label: '煤综合图2'
            },
            {
              value: '2',
              label: '煤综合图3'
            }
          ]
        }
      ],
      selectedMap: '',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      gisLoading: true,
      drawer: true,
      AddAddrDialogConfig,
      AddrTableConfig,
      addrTableData: [
        // {
        //   no: '1',
        //   label: '上海市普陀区金沙江路 1518 弄'
        // }
      ]
    }
  },
  mounted() {
    this.__updataOptions()
  },
  methods: {
    gisMounted() {
      this.__fetchData()
    },
    async __fetchData() {
      this.clearAllAnchorpoint()
      const res = await getAqglAddressList(this.bussiness)
      res.data.forEach((r, idx) => {
        r.no = idx + 1
        r.label = r.addressName
        const { x, y, z } = r
        if (x && y && z) {
          const point = this.setPosPoint({ x, y, z })
          point.viewpointIcon.addEventListener('click', () => {
            this.editAddrDialogVisible = true
            this.$nextTick(() => {
              this.$refs.editAddrDialog.updataForm(r)
            })
          })
        }
        this.addrTableData = res.data
      })
    },
    // 更新下拉数据
    __updataOptions() {
      getDictData(111389).then(res => {
        console.log(res)
        res.data.forEach(r => {
          r.label = r.dictName
          r.value = r.sysDictId
        })
        AddAddrDialogConfig.columns.forEach(it => {
          if (it.field === 'typeId') {
            it.options = res.data
          }
        })
      })
    },
    // 改变地图
    mapChange() {

    },
    // 添加地点
    addAddr() {
      __GIS__dom.addEventListener('click', this.locationFn)
    },
    locationFn(e) {
      let point = this.setClickPoint(e)
      point = Object.assign({
        id: point.id
      }, point.position)
      this.$refs.addAddrDialog.updataForm(point)
      this.addAddrDialogVisible = true
      __GIS__dom.removeEventListener('click', this.locationFn)
    },
    // 添加线
    addLine() {},
    // 初始化Dialog
    initOperationConfig(title) {
      const operationConfig = Object.assign({
        title: `${title}地点`,
        width: '1000px',
        labelWidth: '130px',
        form: this.AddAddrDialogConfig.columns
      })
      return operationConfig
    },
    addAddrSubmit(submitData) {
      saveObject(submitData, this.bussiness).then(res => {
        this.__fetchData()
        this.addAddrDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.addAddrDialog.resetForm()
      })
    },
    editAddrSubmit(submitData) {
      updateObject(submitData, this.bussiness).then(res => {
        this.__fetchData()
        this.editAddrDialogVisible = false
        this.$message.success('更新成功')
        this.$refs.editAddrDialog.resetForm()
      })
    },
    addAddrDialogClose() {
      console.log(this.$refs.addAddrDialog.formData.id)
      if (this.$refs.addAddrDialog.formData.id) {
        this.clearAnchorPointById(this.$refs.addAddrDialog.formData.id)
      }
      this.addAddrDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 !important;
  .drawer {
      width: 260px;
      height: 546px;
      position: absolute;
      top: 12px;
      left: 12px;
      overflow: auto;
      border: 1px solid #ccc;
      ::v-deep.el-drawer__header {
        margin-bottom: 10px;
        border-bottom: 1px solid #000;
        padding: 10px 0;
        text-align: center;
      }
  }
  .gis-wrapper {
    width: 100%;
    height: 100%;
  }
}

</style>
