const Connector = require('./database.connector');
const Helper = require('./database.helper');
const FileConnector = require('./file.connector');

const crypto = require('crypto');

// TODO:
// async function getPaths() {
// 	const rows = await Connector.read('SELECT * FROM Paths');
// 	return Helper.emptyOrRows(rows);
// }
// async function addPath() {

// }
// async function deletePath() {

// }

async function getPrices(paths) {
	let selector = '';
	paths.forEach((pathEntry, index) => {
		if (index === 0) {
			selector += "'";
		}
		if (index < paths.length - 1) {
			selector += pathEntry + "','";
		} else {
			selector += pathEntry + "'";
		}
	});
	selector = selector.replace('-', '\\-');
	console.log('price select path', selector);
	const rows = await Connector.read(`SELECT * FROM Prices WHERE path in (${selector})`);
	return Helper.emptyOrRows(rows);
}
async function addPrice(priceWithoutId) {
	const uuid = crypto.randomBytes(32).toString('hex');
	const rows = await Connector.read(
		`INSERT INTO Prices(
			id,
			type,
			price,
			currency,
			amount) 
	     VALUES 
			(${uuid},
			${priceWithoutId.type},
			${priceWithoutId.price},
			${priceWithoutId.currency},
			${priceWithoutId.amount})`
	);
	return Helper.emptyOrRows(rows);
}
async function deletePrice(id) {
	const rows = await Connector.set(`DELETE FROM Prices WHERE id=${id}`);

	return Helper.emptyOrRows(rows);
}

async function getFlyers() {
	const rows = await Connector.read('SELECT * FROM Flyers');
	return Helper.emptyOrRows(rows);
}
async function addFlyer(flyerWithoutId) {
	const uuid = crypto.randomBytes(32).toString('hex');
	const rows = await Connector.read(
		`INSERT INTO Flyers(
			id,
			href) 
	     VALUES 
			(${uuid},
			${flyerWithoutId.href})`
	);
	return Helper.emptyOrRows(rows);
}
async function deleteFlyer(id) {
	const rows = await Connector.set(`DELETE FROM Flyers WHERE id=${id}`);
	return Helper.emptyOrRows(rows);
}

module.exports = {
	// getPaths,
	getPrices,
	addPrice,
	deletePrice,
	getFlyers,
	addFlyer,
	deleteFlyer,
};
