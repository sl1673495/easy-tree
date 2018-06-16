function initDom(html) {
  var div = document.createElement('div')
  div.innerHTML = html
  return div.childNodes[0]
}