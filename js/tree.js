(function(window) {
	var utils = {
		initDom: function(html) {
			var div = document.createElement('div')
			div.innerHTML = html
			return div.childNodes[0]
		}
	}

	var treeUtils = {
		initTreeLine: function(options) {
			var expand = options.defaultExpandAll
			var classes = expand ? 'tree-line expand' : 'tree-line'
			return utils.initDom("<div class='" + classes + "'></div>")
		},
		handleClickNode: function(e) {
			e.stopPropagation()
			var clickLine = e.currentTarget
			var cls = clickLine.classList
			var isExpand = cls.contains('expand')
			isExpand
			  ? cls.remove('expand') 
			  : cls.add('expand')
		},
		initTree: function(el, nodeList, options) {
			for(var i = 0; i < nodeList.length; i++) {
				var node = nodeList[i]
				var treeLine = treeUtils.initTreeLine(options)
				treeLine.addEventListener('click', treeUtils.handleClickNode)
				treeLine.appendChild(
					utils.initDom(
						'<div class="tree-content">' +
						'<span class="icon icon-expand">+</span>' +
						'<span class="icon icon-shrink">-</span>' +
						node.name +
						'</div>'
					)
				)
				el.appendChild(treeLine)
				var chd = node.children
				if(chd && chd.length) {
					treeUtils.initTree(treeLine, chd, options)
				} else {
					treeLine.classList.add('leaf')
				}
			}
		}
	}

	var EasyTree = function(el, nodeList, options) {
		this.el = el
		this.nodeList = nodeList
		this.options = options
	}

	EasyTree.prototype = {
		constructor: EasyTree,
		init: function() {
			treeUtils.initTree(this.el, this.nodeList, this.options)
		}
	}

	window.EasyTree = EasyTree
})(window)
