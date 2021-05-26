(function(doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function() {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // 1rem = 100px
    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  var clientWidth = docEl.clientWidth
  // 1rem = 100px
  docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
  console.log(docEl.style.fontSize)
})(document, window)

