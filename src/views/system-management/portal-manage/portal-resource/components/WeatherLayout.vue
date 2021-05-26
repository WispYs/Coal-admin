<template>
  <div class="preview-wrapper">
    <div class="weather-content">
      <div class="weather-content__top">
        <img :src="require(`@/assets/images/weather_icon_${weatherIcon}.png`)" alt="">
        <b>{{ week }}</b>
        <b>{{ nowDate }}</b>
      </div>
      <div class="weather-content__bottom">
        <p>{{ temperature }}</p>
        <b>{{ city }}</b>
      </div>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import axios from 'axios'

export default {
  data() {
    return {
      nowDate: '2021-01-01',
      week: '星期日',
      temperature: '32°',
      city: '合肥',
      weatherIcon: 1
    }
  },
  mounted() {
    this.getDate()
    this.getCity()
  },
  methods: {
    // 获取当前日期
    getDate() {
      this.nowDate = parseTime(new Date())
      const weekArr = ['日', '一', '二', '三', '四', '五', '六']
      this.week = `星期${weekArr[new Date().getDay()]}`
    },

    // 获取当前城市
    getCity() {
      const _this = this
      function initMap(result) {
        const lng = result.center.lng
        const lat = result.center.lat
        _this.city = result.name
        _this.getWeather(lng, lat)
      }
      // 获取当前城市
      var curCity = new BMapGL.LocalCity()
      curCity.get(initMap)
    },
    // 获取天气情况
    getWeather(lng, lat) {
      const key = '0aff426e9c6843d190f26ea67048ec9b' // 和风天气key
      axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${lng},${lat}&key=${key}`)
        .then((response) => {
          const nowDateInfo = response.data.daily[0]
          this.temperature = Math.round((Number(nowDateInfo.tempMin) + Number(nowDateInfo.tempMax)) / 2) + '°'
          const weatherCode = nowDateInfo.iconDay
          const weatherCodeFirst = weatherCode.slice(0, 1)
          if (weatherCodeFirst === '1') {
            if (weatherCode === '100' || weatherCode === '150') {
              this.weatherIcon = 1
            } else {
              this.weatherIcon = 2
            }
          }
          if (weatherCodeFirst === '3') {
            this.weatherIcon = 3
          }
          if (weatherCodeFirst === '4') {
            this.weatherIcon = 4
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
.preview-wrapper {
  height: auto;
}
.weather-content {
  padding:40px 20px 0;
  overflow: hidden;
  background: url('~@/assets/images/weather_data_bg.png') no-repeat;
  background-size: cover;
  padding: 20px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  &__top {
    text-align: right;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
    b {
      display: block;
      font-size: 16px;
    }
  }
  &__bottom {
    p {
      font-size: 54px;
      line-height: 40px;
    }
    b {
      display: block;
      margin-top: 15px;
      margin-left: 4px;
      font-size: 16px;
    }
  }
}

</style>
