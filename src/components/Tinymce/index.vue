<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <el-button icon="el-icon-upload" size="mini" type="primary" @click="uploadDialogVisible = true">
        上传图片
      </el-button>
      <!-- <el-button size="mini" type="primary" @click="onSubmit">保存</el-button> -->

    </div>
    <upload-file
      :accept="accept"
      :data="uploadData"
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import { Plugins, Toolbar, FontFormats, FontSizeFormats } from './config'
import load from './loadScript'
import { getImg } from '@/api/tinymce'

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.5/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { UploadFile },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default: () => ([])
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      accept: ['jpg', 'jpeg', 'png'],
      uploadDialogVisible: false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      uploadData: {
        sysFileDictId: 0,
        // menuId: this.$route.name
        menuId: 90022
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val, oldVal) {
      this.hasChange = val === oldVal
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || '')
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : Toolbar,
        menubar: this.menubar,
        plugins: Plugins,
        font_formats: FontFormats,
        fontsize_formats: FontSizeFormats,
        preview_styles: true,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        content_style: 'body { font-family:Arial,sans-serif,Microsoft YaHei; font-size:14px }',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        convert_urls: false,
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
          // 方法不起作用，官方文档也没找见对应方法o(╥﹏╥)o
          // editor.on('add', (e) => {
          //   console.log(e)
          //   e.execCommand('fontName', false, 'Arial')
          //   e.execCommand('fontSize', false, '22')
          // })
        }
        // images_upload_handler: (blobInfo, success, failure) => {
        //   const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        //   success(img)
        // }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    // 上传文件提交
    uploadSubmit(fileList) {
      console.log(fileList)
      fileList.forEach(it => {
        getImg(it.path).then(res => {
          window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${res.data.url}" >`)
        })
      })
      this.uploadDialogVisible = false
    },
    // 富文本编辑器内容提交
    onSubmit() {
      this.$emit('submit-content')
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

</style>
