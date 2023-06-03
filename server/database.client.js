const Connector = require('./database.connector');
const Helper = require('./database.helper');
const validate = require('deep-email-validator');

const crypto = require('crypto');

function generateSalt() {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0.16);
}
function sha512(password, salt) {
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	hash = hash.digest('hex');
	return {
		salt,
		hash,
	};
}
function generatePassword(password) {
	let salt = generateSalt(16);
	let saltedPassword = sha512(password, salt);
	return saltedPassword;
}
function validatePassword(password, salt, hash) {
	let saltedPassword = sha512(password, salt);
	return hash === saltedPassword.hash;
}
async function validateLogin(login) {
	return await validate(login);
}
function validatePasswordInput(password) {
	let passwordValidation = {};
	passwordValidation[lengthCheck] = password.length > 6;
	return passwordValidation;
}
function combineSelector(paths) {
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
	return selector.replace('-', '\\-');
}
// TODO:
// async function getPaths() {
// 	const rows = await Connector.read('SELECT * FROM Paths');
// 	return Helper.emptyOrRows(rows);
// }
// async function addPath() {

// }
// async function deletePath() {

// }

async function getPrices(paths, language) {
	let selector = combineSelector(paths);
	const rows = await Connector.read(
		`SELECT Prices.id,type,price,currency,amount,path,name,description FROM Prices JOIN ServiceDescriptions ON Prices.id=ServiceDescriptions.id AND ServiceDescriptions.language='${language}' WHERE path in (${selector}) `
	);
	console.log('returning rows', rows);
	return { rows };
}
async function getFlyers(language) {
	const rows = await Connector.read(
		`SELECT Flyers.id,href,title,text FROM Flyers JOIN FlyerDescriptions ON Flyers.id=FlyerDescriptions.id AND FlyerDescriptions.language='${language}'`
	);

	return { rows };
}

async function addUser(login, password, groupid) {
	if (checkUserExistance(login)) {
		return false;
	}
	let saltedHash = generatePassword(password);
	const affected = await Connector.read(
		`INSERT INTO Users(
			login,
			password,
			salt,
			groupid) 
	     VALUES 
			(${login},
			${saltedHash.hash},
			${saltedHash.salt},
			${groupid})`
	);
	return { affected: Helper.checkAffected(affected) };
}
async function addPrice(priceObject) {
	const uuid = crypto.randomBytes(32).toString('hex');
	const affectedPrices = await Connector.set(
		`INSERT INTO Prices(
			id,
			type,
			price,
			currency,
			amount,
			) 
	     VALUES 
			(${uuid},
			${priceObject.type},
			${priceObject.price},
			${priceObject.currency},
			${priceObject.amount})`
	);
	const affectedDescriptions = await Connector.set(
		`INSERT INTO ServiceDescriptions(
			id,
			language,
			name,
			description,
			) 
	     VALUES 
			(${uuid},
			${priceObject.language},
			${priceObject.name},
			${priceObject.description})`
	);
	return {
		affected: Helper.checkAffected(affectedDescriptions) & Helper.checkAffected(affectedPrices),
	};
}
async function addFlyer(flyerObject) {
	const uuid = crypto.randomBytes(32).toString('hex');
	const affectedFlyers = await Connector.read(
		`INSERT INTO Flyers(
			id,
			href) 
	     VALUES 
			(${uuid},
			${flyerObject.href})`
	);
	const affectedDescriptions = await Connector.read(
		`INSERT INTO FlyerDescriptions(
			id,
			language,
			title,
			text) 
	     VALUES 
			(${uuid},
			${flyerObject.language},
			${flyerObject.title},
			${flyerObject.text})`
	);
	return {
		affected: Helper.checkAffected(affectedFlyers) & Helper.checkAffected(affectedDescriptions),
		id: uuid,
	};
}

async function deleteUser(login) {
	const affected = await Connector.set(`DELETE FROM Users WHERE login=${login}`);
	return { affected: Helper.checkAffected(affected) };
}
async function deletePrice(id) {
	const affectedPrices = await Connector.set(`DELETE FROM Prices WHERE id=${id}`);
	const affectedDescriptions = await Connector.set(
		`DELETE FROM ServiceDescriptions WHERE id=${id}`
	);
	return {
		affected: Helper.checkAffected(affectedPrices) & Helper.checkAffected(affectedDescriptions),
	};
}
async function deleteFlyer(id) {
	const affectedFlyers = await Connector.set(`DELETE FROM Flyers WHERE id=${id}`);
	const affectedDescriptions = await Connector.set(`DELETE FROM FlyerDescriptions WHERE id=${id}`);
	return {
		affected: Helper.checkAffected(affectedFlyers) & Helper.checkAffected(affectedDescriptions),
	};
}

async function checkUserPassword(login, password) {
	const rows = await Connector.read(`SELECT (login,password,salt) FROM Users WHERE login=${login}`);
	if (rows.length > 1) {
		console.log('Duplicate login detected!');
		return false;
	}
	return validatePassword(password, rows[0].password, rows[0].salt);
}
async function checkUserGroupId(login, group) {
	const rows = await Connector.read(`SELECT (groupid) FROM Users WHERE login=${login}`);
	if (rows.length > 1) {
		console.log('Duplicate login detected!');
		return false;
	}
	return rows[0].groupid === group;
}
async function checkUserExistance(login) {
	const rows = await Connector.read(`SELECT (groupid) FROM Users WHERE login=${login}`);
	if (rows.length > 0) {
		return true;
	}
	return false;
}
async function addSession(login) {
	const uuid = crypto.randomBytes(32).toString('hex');
	const affected = await Connector.set(
		`INSERT INTO Sessions(login,sessionId) VALUES (${login},${uuid})`
	);
	return {
		affected: Helper.checkAffected(affected),
		id: uuid,
	};
}
async function checkSession(login, session) {
	const rows = await Connector.read(
		`SELECT * FROM Sessions WHERE login=${login} AND sessionId=${session}`
	);
	return {
		rows: Helper.emptyOrRows(rows),
	};
}
async function getSession(session) {
	const rows = await Connector.read(`SELECT login FROM Sessions WHERE sessionId=${session}`);
	return {
		rows: Helper.emptyOrRows(rows),
	};
}

module.exports = {
	// getPaths,
	getSession,
	addSession,
	checkSession,
	getPrices,
	addPrice,
	deletePrice,
	getFlyers,
	addFlyer,
	deleteFlyer,
	addUser,
	deleteUser,
	checkUserPassword,
	checkUserGroupId,
	validateLogin,
	validatePassword,
	validatePasswordInput,
};