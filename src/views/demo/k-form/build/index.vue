<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal
    </a-button>
    <a-modal v-model="visible" width="822px" title="Basic Modal" @ok="handleOk">
      <a-button type="primary" @click="getData">
        获取数据
      </a-button>
      <k-form-build ref="kfb" :value="jsonData" />
    </a-modal>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      visible: false,
      jsonData: {}
    }
  },
  async mounted() {
    const a = await axios({
      url: 'http://192.168.1.82:8880/tomo-datasource/source/form/cfg/test2',
      method: 'GET'
    })
    console.log(a)
    this.jsonData = a.data.data.cfg
  },
  methods: {
    showModal() {
      this.visible = true
    },
    // 过滤时间戳字段
    filterTimeStamp(obj) {
      const keys = Object.keys(obj)
      keys.forEach(k => {
        if (k.includes('_timeStamp')) delete obj[k]
      })
      return obj
    },
    getData() {
      let d = {
        checkbox_1617001060785: ['1', '2'],
        date_1617001063594: '2021-03-31',
        date_1617001063594_timeStamp: 1617176024900,
        input_1617000978819: '123',
        radio_1617001061944: '2'
      }
      d = this.filterTimeStamp(d)
      console.log(d)
      this.$refs.kfb.setData(d)
    },
    // 获取表单数据
    handleOk(e) {
      this.$refs.kfb.getData().then(async values => {
        console.log(values)
        this.visible = false
      }).catch(() => {
        console.log('验证未通过，获取失败')
      })
    }
  }
}
</script>

<style></style>
