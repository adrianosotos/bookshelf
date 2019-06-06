function compareBy(a, b, orderBy) {
	const key = Object.keys(orderBy)[0],
		o = orderBy[key],
		valueA = a[key],
		valueB = b[key];
	if (!(valueA || valueB)) {
		console.error("the objects from the data passed does not have the key '" + key + "' passed on sort!");
		return 0;
	}
	if (+valueA === +valueA) {
		return o.toLowerCase() === 'desc' ? valueB - valueA : valueA - valueB;
	} else {
		if (valueA.localeCompare(valueB) > 0) {
			return o.toLowerCase() === 'desc' ? -1 : 1;
		} else if (valueA.localeCompare(valueB) < 0) {
			return o.toLowerCase() === 'desc' ? 1 : -1;
		}
	}
	return 0;
}

function orderBooksBy(books, orderBy) {
	orderBy = Array.isArray(orderBy) ? orderBy : [ orderBy ];
	return books.sort((a, b) => {
		let result;
		for (let i = 0; i < orderBy.length; i++) {
			result = compareBy(a, b, orderBy[i]);
			if (result !== 0) {
				return result;
			}
		}
		return result;
	});
}

export default orderBooksBy;
