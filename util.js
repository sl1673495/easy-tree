function initDom(html) {
	var div = document.createElement('div')
	div.innerHTML = html
	return div.childNodes[0]
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