function emptyOrRows(rows) {
	if (!rows) {
		return [];
	}
	return rows;
}
function checkAffected(rows) {
	if (!rows) {
		return false;
	}
	if (rows.length === 0) {
		return false;
	}
	return true;
}

module.exports = { emptyOrRows, checkAffected };
