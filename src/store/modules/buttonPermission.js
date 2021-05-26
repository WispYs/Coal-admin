import {
  findMenuBtnListById
} from '@/api/authority-management'

const actions = {
  generateRoutes({
    commit
  }, missionConfig) {
    return new Promise((resolve, reject) => {
      findMenuBtnListById(missionConfig.menuId).then(response => {
        response.data.forEach(it => {
          // if (it.checked == 1) {
          if (it.permission == 'create') {
            missionConfig.filterAction.push(it.permission)
          } else if (it.permission == 'edit' || it.permission == 'delete') {
            missionConfig.tableActions.push(it.permission)
          } else {
            missionConfig.othertableActions.push({
              name: it.menuName,
              permission: it.permission
            })
          }
          // }
        })
        resolve(missionConfig)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default {
  namespaced: true,
  actions
}
