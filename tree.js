(function (window) {
  function normalizeTree(treeJson) {
    var ret = []
    for (var i = 0; i < treeJson.length; i++) {
      var cur = treeJson[i]
      if (!cur.pid) {
        ret.push(cur)
      }
    }
    var initChild = function (node) {
      for (var i = 0; i < treeJson.length; i++) {
        var cur = treeJson[i]
        if (node.id === cur.pid) {
          (node.children || (node.children = [])).push(cur)
          initChild(cur)
        }
      }
    }
    for (var i = 0; i < ret.length; i++) {
      initChild(ret[i])
    }
    return ret
  }

  function initTree(el, nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
      var node = nodeList[i]
      var treeLine = initDom('<div class="tree-line"></div>')
      treeLine.addEventListener('click', handleClickNode)
      treeLine.appendChild(
        initDom(
          '<div class="tree-content">' +
          '<span class="icon icon-expand">+</span>' +
          '<span class="icon icon-shrink">-</span>' +
          node.name +
          '</div>'
        )
      )
      el.appendChild(treeLine)
      var children = node.children
      if (children && children.length) {
        initTree(treeLine, node.children)
      } else {
        treeLine.classList.add('leaf')
      }
    }
  }

  function handleClickNode(e) {
    e.stopPropagation()
    var clickLine = e.currentTarget
    var cls = clickLine.classList
    var isExpand = cls.contains('expand')
    isExpand
      ?
      cls.remove('expand') :
      cls.add('expand')
  }

  window.normalizeTree = normalizeTree
  window.initTree = initTree
})(window)