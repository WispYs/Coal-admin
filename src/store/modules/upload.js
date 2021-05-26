import { getFileNameByEventId } from '@/api/upload'

const actions = {
  // 根据上传返回eventId查询附件url
  getFileUrl({ commit }, id) {
    return new Promise((resolve, reject) => {
      getFileNameByEventId(id).then(response => {
        response.data.forEach(d => {
          const type = d.suffix.toLocaleLowerCase()
          const img = ['png', 'jpg', 'jpeg'].includes(type)
          const doc = ['doc', 'docx'].includes(type)
          const xls = ['xls', 'xlsx'].includes(type)
          if (img) {
            d.imgUrl = d.url
          } else if (doc) {
            d.imgUrl = require(`@/assets/images/WORD.png`)
          } else if (xls) {
            d.imgUrl = require(`@/assets/images/EXCEL.png`)
          } else {
            d.imgUrl = require('@/assets/images/UNKNOW.png')
          }
        })
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  actions
}

