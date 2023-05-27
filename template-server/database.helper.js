function emptyOrRows(rows) {
	if (!rows) {
		return [];
	}
	return rows;
}
function emptyOrUndefined(rows) {
	if (!rows) {
		return undefined;
	}
	return rows;
}

module.exports = { emptyOrRows };
