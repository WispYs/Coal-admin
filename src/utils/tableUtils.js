class TableUtils {
  static spanArr = [];
  static pos;
  /**
   * 计算表格行合并数据
   * @param {需要进行行合并的table数据} data
   */
  static getSpanArr(data) {
    for (var i = 0; i < data.length; i++) {
      if (i === 0) {
        this.spanArr.push(1);
        this.pos = 0;
      } else {
        // 判断这一条和上一条id是否相同
        if (data[i].db === data[i - 1].db) {
          this.spanArr[this.pos] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.pos = i;
        }
      }
    }
    return this.spanArr;
  }
}

export { TableUtils };
