<template>
  <div class="page-container announce-container has-tree">
    <div class="announce-aside">
      <div class="announce-aside__header" @click="handleClick">
        <img src="@/assets/images/news.png">
        <span>公文公告</span>
      </div>
      <div class="announce-aside__type">
        <div
          v-for="(it, index) in announceType"
          :key="index"
          class="type-item"
          :class="announceTypeIndex === index ? 'active' : ''"
          @click="handleClick(index, it)"
        >
          <i :class="announceTypeIndex === index ? 'el-icon-caret-right' : 'el-icon-caret-bottom'" />
          <span>{{ it }}</span>
        </div>
      </div>
    </div>
    <div v-if="!detailView" class="announce-content">
      <div v-loading="listLoading" class="content-box">
        <div v-for="(it,index) in list" :key="index" class="content-item">
          <h4 class="content-item__title" @click="showDetail(it.scddAnnouncementId)">【{{ it.type }}】{{ it.title }}</h4>
          <div class="content-item__info">{{ formatContent(it.content) }}</div>
          <div class="content-item__time">
            <img src="@/assets/images/date.png">
            <span>发布日期：{{ it.updateTime }}</span>
          </div>
        </div>
        <div v-if="total === 0" class="no-more">
          <span>暂无数据</span>
        </div>
      </div>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>
    <div v-if="detailView" class="announce-content detail-content">
      <div class="detail-header">
        <i class="el-icon-search search-icon" />
        <span>预览</span>
        <i class="el-icon-close close-icon" @click="hideDetail" />
      </div>
      <div v-loading="detailLoading" class="detail-box">
        <h2 class="detail-title">【{{ detailData.type }}】{{ detailData.title }}</h2>
        <div class="detail-tag">
          <div class="detail-tag__item">
            <img src="@/assets/images/date.png">
            <span>发布日期：{{ detailData.updateTime }}</span>
          </div>
          <div class="detail-tag__item">
            <img src="@/assets/images/department.png">
            <span>{{ detailData.dept }}</span>
          </div>
        </div>
        <div class="detail-info" v-html="detailData.content" />
        <div v-if="detailData.files" class="detail-file">
          <div class="file-title">
            <i class="el-icon-link" />
            <span>附件</span>
            <span>（{{ detailData.files.length }}）</span>
          </div>
          <div class="file-content">
            <div v-for="it in detailData.files" :key="it.eventId" class="file-item">
              <img class="item-img" :src="it.imgUrl" alt="">
              <div class="item-info">
                <p>{{ it.fileName }}</p>
                <span>{{ it.createTime }}</span>
              </div>
              <div class="item-btn">
                <el-button type="text" size="small" @click="preview(it)">预览</el-button>
                <el-button type="text" size="small" @click="download(it)">下载</el-button>
                <el-button type="text" size="small" @click="edit">编辑</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getDispatchAnnounceList, getDispatchAnnounceInfo } from '@/api/product-dispatch'
import { previewDocument, downloadDocument } from '@/api/document-management'

import Pagination from '@/components/Pagination'
import { ServicePlanTableConfig, ServicePlanFilterConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'
export default {
  components: { Pagination },
  data() {
    return {
      announceType: ['管理制度', '机构建设', '领导讲话', '政策法规', '日常通知'],
      announceTypeIndex: '',
      detailView: false,
      list: [],
      detailData: {
        files: []
      },
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      detailLoading: true,
      ServicePlanFilterConfig,
      ServicePlanTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '所属场所',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'typeName'
      },
      deviceTypeId: 0, //  所属场所id
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    // 除去富文本内容标签
    formatContent(str) {
      return str.replace(/<[^>]+>|&nbsp;/g, '')
    },

    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['title', 'type']
      }
      const query = Object.assign(this.listQuery, filter)
      getDispatchAnnounceList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },

    // 切换公告类型
    handleClick(index, item) {
      this.detailView = false
      this.announceTypeIndex = index
      this.queryData({ keyword: item })
    },

    // 查看详情
    showDetail(index) {
      this.detailLoading = true
      this.detailView = true
      getDispatchAnnounceInfo(index).then(async response => {
        this.detailLoading = false
        this.detailData = response.data
        if (response.data.eventId) {
          const eventId = response.data.eventId.split(',')
          const fileUrls = await this.getFileUrls(eventId)
          this.detailData.files = fileUrls
          // 数据层次太多，render函数没有自动更新，需手动强制刷新
          this.$forceUpdate()
        }
      })
    },
    // 当前上传的附件字段的url集合
    getFileUrls(eventId) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('upload/getFileUrl', eventId).then((data) => {
          resolve(data)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },
    // 关闭详情
    hideDetail() {
      this.detailView = false
    },

    // 预览
    preview(f) {
      previewDocument(f.sysFileInfoId)
    },

    // 下载
    download(f) {
      const file = {
        fileName: f.fileName,
        uploadPath: f.uploadPath
      }
      downloadDocument(file)
    },
    // 编辑
    edit() {
      this.$router.push('/product-dispatch/dispatch-manage/announce')
    }

  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
  .announce-container {
    @include clearfix;
    .announce-aside {
      float: left;
      width: 200px;
      height: 100%;
      margin-right: 15px;
      background: #ffffff;
      border-right: 1px solid #DCDFE6;
      padding: 20px;
      line-height: 32px;
      &__header {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
        cursor: pointer;
        img {
          float: left;
          margin-right: 3px;
        }
      }
      &__type {
        .type-item {
          padding-left: 30px;
          margin-bottom: 15px;
          cursor: pointer;
          color: #333;
          i {
            line-height: 32px;
            margin-right: 10px;
            font-size: 18px;
            color: #dcdcdc;
          }
          &.active {
            @include primaryColor($primaryColor);
            i {
              @include primaryColor($primaryColor);
            }
          }
        }
      }
    }
    .announce-content {
      position: relative;
      float: left;
      width: calc(100% - 215px);
      height: 100%;
      background: #ffffff;
      border-left: 1px solid #DCDFE6;
      padding: 20px;
      overflow: auto;
      .no-more {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: #999;
          font-size: 12px;
        }
      }
      .content-box {
        height: calc(100% - 96px);
        overflow: auto;
        border-bottom: 1px solid #eeeeee;
      }
      .content-item {
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;

        &:last-of-type {
          border-bottom: none;
        }
        &__title {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 10px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        &__info {
          font-size: 13px;
          color: #999;
          width: 100%;
          padding: 0 10px;
          line-height: 22px;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        &__time {
          font-size: 13px;
          color: #333;
          font-weight: bold;
          img {
            float: left;
            width: 20px;
            margin: 0 10px;
          }
        }
      }
      &.detail-content {
        padding: 0 20px;
      }
      .detail-header {
        @include clearfix;
        line-height: 50px;
        border-bottom: 1px solid #eeeeee;
        color: #333;
        i {
          line-height: 50px;
          color: #333;
        }
        .search-icon {
          float: left;
          margin-right: 10px;
        }
        span {
          float: left;
          font-size: 16px;
          color: #333;
        }
        .close-icon {
          float: right;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .detail-box {
        .detail-title {
          font-size: 20px;
          margin: 20px auto 30px;
        }
        .detail-tag {
          @include clearfix;
          margin-bottom: 15px;
          &__item {
            float: left;
            font-size: 13px;
            color: #333;
            font-weight: bold;
            margin-right: 30px;
            img {
              float: left;
              width: 20px;
              margin: 0 10px;
            }
          }
        }
        .detail-info {
          padding: 0 10px;
          font-size: 13px;
          color: #333;
          line-height: 24px;
          margin-bottom: 40px;
        }
        .detail-file {
          .file-title {
            @include clearfix;
            line-height: 50px;
            border-bottom: 1px solid #eeeeee;
            color: #333;
            margin-bottom: 20px;
            i {
              line-height: 50px;
              color: #333;
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
              font-size: 16px;
              color: #333;
            }
          }
          .file-content {
            @include clearfix;
            .file-item {
              @include clearfix;
              float: left;
              width: calc(50% - 10px);
              min-width: 350px;
              height: 80px;
              padding: 20px;
              margin-bottom: 20px;
              background: #f9f9f9;
              border-radius: 8px;
              &:nth-of-type(odd) {
                margin-right: 20px;
              }
              .item-img {
                float: left;
                width: 40px;
                height: 40px;
                margin-right: 10px;
              }
              .item-info {
                float: left;
                width: calc(100% - 180px);
                p {
                  font-size: 12px;
                  color: #333;
                  margin-bottom: 3px;
                  font-weight: bold;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span {
                  font-size: 12px;
                  color: #999;
                }
              }
              .item-btn {
                float: right;
                line-height: 40px;
                ::v-deep {
                  .el-button+.el-button {
                    margin-left: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
