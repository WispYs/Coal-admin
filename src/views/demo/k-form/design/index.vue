<template>
  <div>
    <k-form-design
      title="表单设计器"
      :show-head="false"
      :toolbars="['save', 'preview', 'importJson', 'exportJson', 'reset']"
      @save="handleSave"
    />
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  methods: {
    handleSave(data) {
      const a = axios({
        url: 'http://192.168.1.83:8880/tomo-datasource/source/mgr/create',
        method: 'post',
        data: qs.stringify({ cfg: data })
      })
      console.log(a)
    }
  }
}
</script>

<style></style>
