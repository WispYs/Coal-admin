<template>
  <div class="page-container portal-layout-wrapper">
    <div v-if="!nullLayoutData">
      <div class="layout-btn">
        <el-button type="primary" size="medium" icon="el-icon-edit" @click="edit">{{ editable ? '保存模板' : '编辑模板' }}</el-button>
        <el-button v-if="editable" type="primary" size="medium" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-row :gutter="20" style="margin-bottom: 20px;">
            <draggable
              v-model="layoutBoard"
              :disabled="!editable"
              chosen-class="is-selected"
              force-fallback="true"
              group="layoutBoard"
              animation="1000"
              @start="onStart"
              @end="onEnd"
            >
              <transition-group>
                <template v-for="(it,index) in layoutBoard" class="col-content">
                  <el-col :key="index" :span="it.span" style="margin-bottom: 20px;overflow: hidden">
                    <div class="board-wrapper" :class="editable ? 'editable' : ''">
                      <div v-if="it.class === 'list-data-content' || it.class === 'list-data2-content'" class="board-title">
                        <span>{{ it.title }}</span>
                        <b class="board-more">更多</b>
                      </div>
                      <div v-else-if="it.class !== 'weather-content'" class="board-title">{{ it.title }}</div>
                      <div class="board-content" :class="it.class">
                        <component :is="it.component" :resource-data="it.resourceData" />
                      </div>
                    </div>
                  </el-col>
                </template>
              </transition-group>
            </draggable>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div v-else class="null-data">
      <div>
        <span>未分配资源权限</span>
        <el-button type="primary" size="medium" @click="$router.push({path: '/system-management/portal-manage/portal-authority'})">前去分配</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBoard from './components/NavBoard'
import LineChartLayout from './components/LineChartLayout'
import BarChartLayout from './components/BarChartLayout'
import PieChartLayout from './components/PieChartLayout'
import NumberLayout1 from './components/NumberLayout1'
import NumberLayout2 from './components/NumberLayout2'
import NumberLayout3 from './components/NumberLayout3'
import ListLayout1 from './components/ListLayout1'
import ListLayout2 from './components/ListLayout2'
import WeatherLayout from './components/WeatherLayout'
// 导入draggable组件
import draggable from 'vuedraggable'
import { getAuthPortalLayout, editAuthPortalLayout } from '@/api/portal-manage'

export default {
  name: 'Dashboard',
  components: {
    NavBoard,
    LineChartLayout,
    BarChartLayout,
    PieChartLayout,
    NumberLayout1,
    NumberLayout2,
    NumberLayout3,
    ListLayout1,
    ListLayout2,
    WeatherLayout,
    draggable
  },
  data() {
    return {
      // layoutBoard: [
      //   { component: NavBoard, title: '快捷导航', class: 'nav-content', span: 6 },
      //   { component: NumberLayout1, title: '采集区异常', class: 'number-data-content', span: 6 },
      //   { component: NumberLayout2, title: '工业视频异常', class: 'number-data-content', span: 6 },
      //   { component: WeatherLayout, title: '', class: 'weather-content', span: 6 },
      //   { component: LineChartLayout, title: '生产量', class: 'chart-data-content', span: 18 },
      //   { component: NumberLayout3, title: '检测异常', class: 'number-data-content', span: 6 },
      //   { component: ListLayout1, title: '通知消息', class: 'list-data-content', span: 6 },
      //   { component: BarChartLayout, title: '年产量', class: 'chart-data-content', span: 18 },
      //   { component: ListLayout2, title: '待办消息', class: 'list-data2-content', span: 6 },
      //   { component: PieChartLayout, title: '产量分部图', class: 'chart-data-content', span: 18 }
      // ],
      nullLayoutData: true, // 没有资源布局数据
      editable: false, // 是否可编辑
      layoutBoard: [],
      // 预定模板列表，value表示模板Id
      templateModel: [
        { value: '1', component: LineChartLayout, class: 'chart-data-content', span: 18 },
        { value: '2', component: BarChartLayout, class: 'chart-data-content', span: 18 },
        { value: '3', component: PieChartLayout, class: 'chart-data-content', span: 18 },
        { value: '4', component: ListLayout1, class: 'list-data-content', span: 6 },
        { value: '5', component: ListLayout2, class: 'list-data2-content', span: 6 },
        { value: '6', component: NumberLayout1, class: 'number-data-content', span: 6 },
        { value: '7', component: NumberLayout2, class: 'number-data-content', span: 6 },
        { value: '8', component: NumberLayout3, class: 'number-data-content', span: 6 },
        { value: '9', component: NavBoard, class: 'nav-content', span: 6 },
        { value: '10', component: WeatherLayout, class: 'weather-content', span: 6 }
      ]
    }
  },
  created() {
    this.__fetchLayout()
  },
  methods: {
    // 获取当前用户门户布置设置
    __fetchLayout() {
      getAuthPortalLayout().then(response => {
        const layoutList = response.data
        if (response.data && response.data.length > 0) {
          // 获取接口布局数据
          const asyncLayout = []
          layoutList.forEach(layout => {
          // 通过比对接口数据的模板ID和预定模板的value得到对应模板
            const layoutData = this.templateModel.filter(it => layout.templateId == it.value)[0]
            // 如果是快捷导航，从store中获取收藏菜单数据
            if (layout.templateId === 9) {
              asyncLayout.push(Object.assign(layoutData, {
                title: layout.title,
                cfgResourceId: layout.cfgResourceId,
                resourceData: this.$store.state.user.collectMenu
              }))
            } else {
              asyncLayout.push(Object.assign(layoutData, {
                title: layout.title,
                cfgResourceId: layout.cfgResourceId
              }))
            }
          })
          this.nullLayoutData = false
          this.layoutBoard = asyncLayout
        } else {
          this.nullLayoutData = true
        }
      })
    },
    // 开始拖拽事件
    onStart(e) {
      console.log(this.layoutBoard)
    },
    // 拖拽结束事件
    onEnd(e) {
      console.log(this.layoutBoard)
    },
    edit() {
      // 如果当前为编辑，则提交数据
      if (this.editable) {
        // 格式化提交的模板数据
        const asyncLayout = []
        this.layoutBoard.forEach((it, index) => {
          asyncLayout.push({
            cfgResourceId: it.cfgResourceId,
            sort: index
          })
        })
        console.log(asyncLayout)
        editAuthPortalLayout(asyncLayout).then(response => {
          console.log(response)
        })
      }
      this.editable = !this.editable
    },
    reset() {
      this.__fetchLayout()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.is-selected {
  .board-wrapper {
    border: 2px solid #3089dc !important;
  }
}
.col-content {
  @include clearfix;
}
.portal-layout-wrapper {
  min-width: 1200px;
  background: $pageBg !important;
  .layout-btn {
    text-align: right;
    padding: 10px 0;
  }
  .board-wrapper {
    position: relative;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #fff;
    &.editable {
      border: 2px dashed #666;
    }
    .board-title,
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      font-size: 16px;
      font-weight: bold;
    }
    .board-title {
      padding: 10px 15px;
      border-bottom: 1px solid #f7f7f7;
      b {
        float: right;
        color: #0387fe;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    ::v-deep {
      .el-tabs__header {
        padding: 0 15px;
      }
      .el-tabs__nav-wrap::after {
        height: 1px;
        background-color: #f7f7f7;
      }
      .el-tabs__item {
        font-size: 15px;
      }
      .el-tabs__item.is-active,.el-tabs__item:hover {
        font-weight: bold;
        color:rgba(0, 0, 0, 0.65);
      }
    }

    .board-content {
      &.nav-content,
      &.number-data-content,
      &.list-data-content,
      &.weather-content,
      &.worklog-content {
        height: 240px;
      }
      &.list-data2-content,
      &.chart-data-content {
        height: 500px;
      }
      .swiper-content {
        background: #fff;
        height: 100%;
        ::v-deep {
          .el-carousel--horizontal,
          .el-carousel__container {
            height: 100%;
          }
          .el-carousel {
            padding-top: 42px;
            position: relative;
          }
          .el-carousel__button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .el-carousel__indicators--outside {
            position: absolute;
            top: 4px;
            right: 20px;
            bottom: initial;
            left: initial;
            button {
              background-color: #999;
            }
          }
        }

      }
    }
  }
  .null-data {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: block;
      margin-bottom: 10px;
      color: #999;
    }
  }
}

</style>
