const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
const route = require('./route')
const dashboard = require('./dashboard')
const workingLifecycle = require('./working-lifecycle')
const roadWayLifecycle = require('./roadway-lifecycle')
const miningOperation = require('./mining-operation')
const organization = require('./organization')
const liabilitySystem = require('./liability-system')
const assessmentLibrary = require('./assessment-library')
const controlMeasure = require('./control-measure')
const authorityManagement = require('./authority-management')
const gis = require('./gis')
const mechatronics = require('./mechatronics')
const productDispatch = require('./product-dispatch')
const portalManage = require('./portal-manage')

const mocks = [
  ...user,
  ...table,
  ...route,
  ...dashboard,
  ...workingLifecycle,
  ...roadWayLifecycle,
  ...miningOperation,
  ...organization,
  ...liabilitySystem,
  ...assessmentLibrary,
  ...controlMeasure,
  ...authorityManagement,
  ...gis,
  ...mechatronics,
  ...productDispatch,
  ...portalManage
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

