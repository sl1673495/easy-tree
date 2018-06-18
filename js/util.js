function initTreeJson(treeJson, idKey, pidKey, childKey) {
	idKey = idKey || 'id'
	pidKey = pidKey || 'pid'
	childKey = childKey || 'children'
	var ret = []
	var initChild = function(node) {
		for(var i = 0; i < treeJson.length; i++) {
			var cur = treeJson[i]
			if(node[idKey] === cur[pidKey]) {
				(node[childKey] || (node[childKey] = [])).push(cur)
				initChild(cur)
			}
		}
	}
	for(var i = 0; i < treeJson.length; i++) {
		var cur = treeJson[i]
		if(!normalizedId(cur[pidKey])) {
			ret.push(cur)
			initChild(cur)
		}
	}
	return ret
}

// 将id格式化，找出最外层id
function normalizedId(id) {
	var idInt = Number(id)
		// id是非数字类型 直接return
	if(isNaN(idInt)) {
		return id
	} else {
		return idInt
	}
}

// 随机生成树json
function initRandomTree() {
	var MAX_LEVEL = 5
	var ret = []
	var levels = []
	for(var i = 0; i < MAX_LEVEL; i++) {
		ret.push({
			name: '第一层' + i
		})
		levels.push(1)
	}
	var initChild = function(node, idx) {
		levels[idx] ++
		(node.children = []).push({
			name: '内层' + idx
		});
		(levels[idx] < MAX_LEVEL) && initChild(node.children[0], idx)
	}

	for(var i = 0; i < ret.length; i++) {
		var cur = ret[i]
		initChild(cur, i)
	}
	initChild(ret)
	return ret
}