<template>
  <div class="big-data__top">
    <div class="big-data__weather">
      <img :src="require(`@/assets/images/big-data_weather_icon_${weatherIcon}.png`)" alt="">
      <div class="weather-info">
        <span>{{ temperature }}</span>
        <span>温度</span>
      </div>
    </div>
    <div class="big-data__nav">
      <div
        v-for="(item, index) in navMenu"
        :key="index"
        class="nav-item"
        :class="{'active' : $route.path === item.url, 'right-nav' : index > 2}"
        @click="$router.push({path: item.url})"
      >{{ item.title }}</div>
    </div>
    <div class="big-data__time">
      <span :title="week">{{ week }}</span>
      <span :title="nowDate">{{ nowDate }}</span>
      <!-- <em>{{ nowDate }}</em> -->
    </div>
  </div>

</template>
<script>
import { parseTime } from '@/utils'
import axios from 'axios'
export default {
  props: {
    navMenu: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      nowDate: '2021-01-01',
      week: '星期日',
      temperature: '32°',
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
      // const newDataArr = parseTime(new Date()).split('-')
      // this.nowDate = `${newDataArr[0]}年${newDataArr[1]}月${newDataArr[2]}日`
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
@import '~@/assets/styles/mixin.scss';
.big-data__top {
  @include clearfix;
  width: 100%;
  height: .95rem;
  position: absolute;
  top: 0;
  left: 0;
  padding: .15rem 0 0;
  background: url('~@/assets/images/big-data_decision_top.png') no-repeat bottom center;
  background-size: contain;
}
.big-data__weather {
  @include clearfix;
  float: left;
  width: 1.1rem;
  padding-left: .15rem;
  img {
    float: left;
    width: .4rem;
    height: .4rem;
    margin-right: .05rem;
  }
  .weather-info {
    float: left;
    span {
      display: block;
      color: #fff;
      font-size: .16rem;
      line-height: .2rem;
    }
  }
}
.big-data__time {
  // position: absolute;
  float: right;
  width: 1.1rem;
  padding-right: .1rem;
  transform: translateX(-.1rem);
  overflow: hidden;
  span {
    @include ellipsis(100%);
    display: block;
    text-align: right;
    color: #fff;
    font-size: .16rem;
    line-height: .22rem;
  }
  // em {
  //   display: block;
  //   text-align: left;
  //   color: #fff;
  //   font-size: .14rem;
  //   line-height: .22rem;
  //   font-style: normal;
  //   width: 1.5rem;
  // }
}
.big-data__nav {
  @include clearfix;
  float: left;
  width: calc(100% - 2.2rem);
  color: #fff;
  .nav-item {
    cursor: pointer;
    width: 1.96rem;
    height: .5rem;
    line-height: .5rem;
    margin-right: -.1rem;
    text-align: center;
    font-size: .18rem;
    float: left;
    background: url('~@/assets/images/big-data_left.png') no-repeat;
    background-size: cover;
    &.active,&:hover {
      background: url('~@/assets/images/big-data_left_active.png') no-repeat;
      background-size: cover;
    }
    /** 最右侧按钮 - 应急指挥 */
    &:nth-of-type(4) {
      margin-right: 0;
    }
    // &.left-nav {

    // }
    &.right-nav {
      float: right;
      background: url('~@/assets/images/big-data_right.png') no-repeat;
      background-size: cover;
      &.active,&:hover {
        background: url('~@/assets/images/big-data_right_active.png') no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
