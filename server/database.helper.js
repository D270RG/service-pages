function emptyOrRows(rows) {
	if (!rows) {
		return [];
	}
	return rows;
}
function checkAffected(affected) {
	if (affected === 0) {
		return false;
	}
	return true;
}

module.exports = { emptyOrRows, checkAffected };
