import { getEquipTypeList, getEquipPlaceList, getChildTypeList, getCategoryList, getModelList, getSupplierList } from '@/api/mechatronics'
import { getDataDictionaryChildTree } from '@/api/authority-management'

const actions = {
  // 获取大型设备类型树结构列表
  getEquipTypeList() {
    return new Promise((resolve, reject) => {
      getEquipTypeList().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取所属场所节点列表
  getEquipPlaceList() {
    return new Promise((resolve, reject) => {
      getEquipPlaceList().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询所属场所子节点类型
  getChildTypeList({ commit }, id) {
    return new Promise((resolve, reject) => {
      getChildTypeList({ id }).then(response => {
        const { data } = response
        resolve(data.rows)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备类型下拉框数据
  getCategoryList() {
    return new Promise((resolve, reject) => {
      getCategoryList({ page: 1, pagerows: 1000 }).then(response => {
        const { data } = response
        resolve(data.rows)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备型号下拉框数据
  getModelList({ commit }, id) {
    return new Promise((resolve, reject) => {
      getModelList({ machineTypeId: id, page: 1, pagerows: 1000 }).then(response => {
        const { data } = response
        resolve(data.rows)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取生产厂家/供应商下拉框数据
  getSupplierList() {
    return new Promise((resolve, reject) => {
      getSupplierList({ page: 1, pagerows: 1000 }).then(response => {
        const { data } = response
        resolve(data.rows)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取数据字典
  getDataDictionary({ commit }, parentId) {
    return new Promise((resolve, reject) => {
      getDataDictionaryChildTree(parentId).then(response => {
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

