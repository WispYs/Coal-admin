// 项目状态
export function statusFilter(status) {
  const statusMap = {
    1: '未开始',
    2: '进行中',
    3: '已完成',
    4: '已搁置'
  }
  return statusMap[status]
}
// 状态标签tag对应的class
export function typeFilter(status) {
  const statusMap = {
    1: 'info',
    2: '',
    3: 'success',
    4: 'danger'
  }
  return statusMap[status]
}
