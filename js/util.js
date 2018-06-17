function initTreeJson(treeJson, idKey, pidKey, childKey) {
	idKey = idKey || 'id'
	pidKey = pidKey || 'pid'
	childKey = childKey || 'children'
	var ret = []
	for(var i = 0; i < treeJson.length; i++) {
		var cur = treeJson[i]
		if(!normalizedId(cur[pidKey])) {
			ret.push(cur)
		}
	}
	var initChild = function(node) {
		for(var i = 0; i < treeJson.length; i++) {
			var cur = treeJson[i]
			if(node[idKey] === cur[pidKey]) {
				(node[childKey] || (node[childKey] = [])).push(cur)
				initChild(cur)
			}
		}
	}
	for(var i = 0; i < ret.length; i++) {
		initChild(ret[i])
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