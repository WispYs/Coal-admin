export default {
  /**
   *
   * @param {number} beforeStart        距离工作开始的时间 (天)
   * @param {number} workTime           工作持续时间 (天)
   * @param {string} sDate              工作开始日期 (yyyy-MM-dd)
   * @param {string} eDate              工作结束日期 (yyyy-MM-dd)
   * @param {string} lateDay            工作滞后天数
   */
  title: '工作面采掘接替横道图',
  startTime: '2021-02-01',
  works: [
    {
      name: '1216(1)工作面',
      beforeStart: 180,
      workTime: 80,
      sDate: '2021-08-01',
      eDate: '2021-10-21',
      lateDay: '天数：5天'
    }, {
      name: '工作面安装',
      beforeStart: 100,
      workTime: 60,
      sDate: '2021-05-11',
      eDate: '2021-07-11',
      lateDay: '未滞后'
    }, {
      name: '1331(3)底抽巷',
      beforeStart: 75,
      workTime: 60,
      sDate: '2021-04-15',
      eDate: '2021-06-16',
      lateDay: '未滞后'
    }, {
      name: '1311(1)轨道顺槽',
      beforeStart: 40,
      workTime: 50,
      sDate: '2021-03-10',
      eDate: '2021-05-01',
      lateDay: '天数：1天'
    }, {
      name: '预抽期',
      beforeStart: 40,
      workTime: 25,
      sDate: '2021-03-10',
      eDate: '2021-04-05',
      lateDay: '未滞后'
    }, {
      name: '瓦斯采抽',
      beforeStart: 15,
      workTime: 35,
      sDate: '2021-02-16',
      eDate: '2021-03-20',
      lateDay: '天数：3天'
    }
  ]
}
