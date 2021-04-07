<template>
  <div class="page-container dashboard-wrapper">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="12">
            <div class="board-wrapper">
              <div class="board-title">快捷导航</div>
              <div class="board-content nav-content">
                <nav-board />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="board-wrapper">
              <div class="board-title">待办事项</div>
              <div class="board-content backlog-content">
                <backlog-board />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="24">
            <div class="board-wrapper">
              <div class="board-title">产量图</div>
              <div class="board-content product-content">
                <product-board />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="board-wrapper">
              <el-tabs v-model="infoActive">
                <el-tab-pane label="新闻中心" name="news">
                  <div class="board-content infomation-content">
                    <news-board />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="通知公告" name="notice">
                  <div class="board-content infomation-content">
                    <notice-board />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="24">
            <div class="board-wrapper">
              <div class="board-title">值班信息</div>
              <div class="board-content worklog-content">
                <worklog-board />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="24">
            <div class="board-wrapper">
              <div class="board-title">待办项目</div>
              <div class="board-content project-content">
                <project-board />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="24">
            <div class="board-wrapper">
              <div class="board-title">公文新闻</div>
              <div class="board-content office-content">
                <office-board />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBoard from './components/NavBoard'
import BacklogBoard from './components/BacklogBoard'
import ProductBoard from './components/ProductBoard'
import WorklogBoard from './components/WorklogBoard'
import ProjectBoard from './components/ProjectBoard'
import OfficeBoard from './components/OfficeBoard'
import NewsBoard from './components/NewsBoard'
import NoticeBoard from './components/NoticeBoard'

export default {
  name: 'Dashboard',
  components: {
    NavBoard,
    BacklogBoard,
    WorklogBoard,
    ProductBoard,
    ProjectBoard,
    OfficeBoard,
    NewsBoard,
    NoticeBoard
  },
  data() {
    return {
      infoActive: 'news' // 消息模块选项卡
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.dashboard-wrapper {
  @include clearfix;
  background: $pageBg !important;
  .board-wrapper {
    position: relative;
    background: #fff;
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
      &.backlog-content,
      &.worklog-content {
        height: 242px;
      }
      &.product-content,
      &.project-content {
        height: 374px;
      }
      &.office-content,
      &.infomation-content {
        height: 400px;
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
}

</style>
