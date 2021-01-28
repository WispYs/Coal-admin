import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { parseTime } from '@/utils'

/**
 *
 * @param {string} id           table id
 * @param {string} filename     导出文件名称
 * @param {boolean} attachTime  文件名称是否附带当前时间
 */
export default function exportExcel(id, filename = 'table-list', attachTime = true) {
  const nowDate = new Date()
  const excelName = `${filename}_${parseTime(nowDate)}`
  console.log(excelName)
  // 判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去，
  var fix = document.querySelector('.el-table__fixed')
  var wb
  if (fix) {
    wb = XLSX.utils.table_to_book(document.querySelector(`#${id}`).removeChild(fix))
    document.querySelector(`#${id}`).appendChild(fix)
  } else {
    wb = XLSX.utils.table_to_book(document.querySelector(`#${id}`))
  }
  /* 获取二进制字符串作为输出 */
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(
      // Blob 对象表示一个不可变、原始数据的类文件对象。
      // Blob 表示的不一定是JavaScript原生格式的数据。
      // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: 'application/octet-stream' }),
      // 设置导出文件名称
      `${excelName}.xlsx`
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
