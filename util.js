function initDom(html) {
  var div = document.createElement('div')
  div.innerHTML = html
  return div.childNodes[0]
}

function find(arr, filter) {
  var ret = null
  for (var i = 0; i < arr.length; i++) {
    var cur = arr[i]
    if (filter(cur)) {
      ret = cur
      break
    }
  }
  return ret
}