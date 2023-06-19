const Connector = require('./database.connector');
const Helper = require('./database.helper');
const crypto = require('crypto');

function generateSalt(length) {
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
function validatePasswordInput(password) {
	let passwordValidation = {};
	passwordValidation['lengthCheck'] = password.length > 6;
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

async function getPaths(groupId) {
	let rows = '';
	if (groupId === 'admin') {
		rows = await Connector.read(
			`SELECT Paths.component,Paths.path FROM Paths 
			  JOIN AccessList 
			 ON AccessList.path = Paths.path 
			 WHERE AccessList.groupid='user' 
			 OR AccessList.groupid='admin'`
		);
	} else {
		rows = await Connector.read(
			`SELECT Paths.component,Paths.path FROM Paths 
			  JOIN AccessList 
			 ON AccessList.path = Paths.path 
			 WHERE AccessList.groupid='user'`
		);
	}

	return Helper.emptyOrRows(rows);
}
// async function addPath(path,component,groupId) {

// }
// async function deletePath() {}

async function getPrices(paths, language) {
	let selector = combineSelector(paths);
	const rows = await Connector.read(
		`SELECT Prices.id,type,price,currency,amount,path,name,description FROM Prices JOIN ServiceDescriptions ON Prices.id=ServiceDescriptions.id AND ServiceDescriptions.language='${language}' WHERE path in (${selector}) `
	);
	return { rows };
}
async function getFlyers(language) {
	const rows = await Connector.read(
		`SELECT Flyers.id,href,title,text FROM Flyers JOIN FlyerDescriptions ON Flyers.id=FlyerDescriptions.id AND FlyerDescriptions.language='${language}'`
	);

	return { rows };
}

async function addUser(login, password, groupid) {
	let saltedHash = generatePassword(password);
	const affected = await Connector.read(
		`INSERT INTO Users(
			login,
			password,
			salt,
			groupid,
			active) 
	     VALUES 
			('${login}',
			'${saltedHash.hash}',
			'${saltedHash.salt}',
			'${groupid}',
			${0})`
	);
	return { affected: Helper.checkAffected(affected) };
}
// async function activateUser(expirationUuid) {
// 	const login = await Connector.read(
// 		`SELECT login FROM SessionExpiration WHERE confirmationId=${expirationUuid}`
// 	);
// 	const affectedUsers = await Connector.set(
// 		`UPDATE Users
// 		 SET active=1
// 		 WHERE login='${login}'`
// 	);
// 	return { login, affected: Helper.checkAffected(affectedUsers) };
// }
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
			('${uuid}',
			'${priceObject.type}',
			'${priceObject.price}',
			'${priceObject.currency}',
			'${priceObject.amount}')`
	);
	const affectedDescriptions = await Connector.set(
		`INSERT INTO ServiceDescriptions(
			id,
			language,
			name,
			description,
			) 
	     VALUES 
			('${uuid}',
			'${priceObject.language}',
			'${priceObject.name}',
			'${priceObject.description}')`
	);
	return {
		affected: Helper.checkAffected(affectedDescriptions) & Helper.checkAffected(affectedPrices),
	};
}
async function addFlyer(language, title, text, uuid) {
	const affectedFlyers = await Connector.read(
		`INSERT INTO Flyers (id,href) VALUES ('${uuid}','home')`
	);
	const affectedDescriptions = await Connector.read(
		`INSERT INTO FlyerDescriptions (id,language,title,text) VALUES ('${uuid}','${language}','${title}','${text}')`
	);
	const flyers = await getFlyers(language);
	return {
		affected: Helper.checkAffected(affectedFlyers) & Helper.checkAffected(affectedDescriptions),
		flyers,
	};
}

async function deleteUser(login) {
	const affected = await Connector.set(`DELETE FROM Users WHERE login='${login}'`);
	return { affected: Helper.checkAffected(affected) };
}
async function deletePrice(id) {
	const affectedPrices = await Connector.set(`DELETE FROM Prices WHERE id='${id}'`);
	const affectedDescriptions = await Connector.set(
		`DELETE FROM ServiceDescriptions WHERE id='${id}'`
	);
	return {
		affected: Helper.checkAffected(affectedPrices) & Helper.checkAffected(affectedDescriptions),
	};
}
async function deleteFlyer(id, language) {
	const affectedFlyers = await Connector.set(`DELETE FROM Flyers WHERE id='${id}'`);
	const affectedDescriptions = await Connector.set(
		`DELETE FROM FlyerDescriptions WHERE id='${id}'`
	);
	const flyers = await getFlyers(language);
	return {
		affected: Helper.checkAffected(affectedFlyers) & Helper.checkAffected(affectedDescriptions),
		flyers,
	};
}

async function checkUserPassword(login, password) {
	const rows = await Connector.read(`SELECT * FROM Users WHERE login='${login}'`);
	if (rows.length === 0) {
		return false;
	}
	return validatePassword(password, rows[0].salt, rows[0].password);
}
async function checkUserGroupId(login, group) {
	const rows = await Connector.read(`SELECT (groupid) FROM Users WHERE login='${login}'`);
	if (rows.length === 0) {
		return false;
	}
	return rows[0].groupid === group;
}
async function checkUserExistance(login) {
	const rows = await Connector.read(`SELECT (groupid) FROM Users WHERE login='${login}'`);
	return Helper.emptyOrRows(rows).length > 0;
}
// async function addExpiration(login) {
// 	const uuid = crypto.randomBytes(16).toString('hex');
// 	const confirmationUuid = crypto.randomBytes(16).toString('hex');
// 	const affectedExpiration = await Connector.set(
// 		`INSERT INTO SessionExpiration(login,confirmationId,created) VALUES ('${login}','${uuid}',UNIX_TIMESTAMP())`
// 	);
// 	return {
// 		affected: Helper.checkAffected(affectedExpiration),
// 		confirmationId: confirmationUuid,
// 	};
// }
async function addSession(login) {
	const uuid = crypto.randomBytes(16).toString('hex');
	const affectedSessions = await Connector.set(
		`INSERT INTO Sessions(login,sessionId) VALUES ('${login}','${uuid}')`
	);
	return {
		affected: Helper.checkAffected(affectedSessions),
		id: uuid,
	};
}
// async function confirmSession(confirmationId) {
// 	const rows = await Connector.read(
// 		`SELECT * FROM SessionExpiration WHERE sessionId='${confirmationId}'`
// 	);
// 	if (Helper.emptyOrRows(rows).length > 0) {
// 		const sessionActiveAffected = await Connector.set(
// 			`DELETE FROM SessionExpiration WHERE sessionId='${confirmationId}'`
// 		);
// 		return Helper.emptyOrRows(sessionActiveAffected).length > 0;
// 	} else {
// 		return false;
// 	}
// }
async function checkSession(login, session) {
	const rows = await Connector.read(
		`SELECT * FROM Sessions WHERE login='${login}' AND sessionId='${session}'`
	);
	return Helper.checkAffected(rows);
}

// async function getSession(session) {
// 	const rows = await Connector.read(`SELECT login FROM Sessions WHERE sessionId='${session}'`);
// 	return rows[0].login,

// }

async function deleteSession(login, session) {
	const rows = await Connector.read(
		`DELETE FROM Sessions WHERE login='${login}' AND sessionId='${session}'`
	);
	return Helper.checkAffected(rows);
}

async function getGroupId(login) {
	const rows = await Connector.read(`SELECT groupid FROM Users WHERE login='${login}'`);
	if (rows.length === 0) {
		return {
			rows: 'user',
		};
	}
	return rows[0].groupid;
}
module.exports = {
	getPaths,
	getGroupId,
	checkSession,
	// getSession,
	addSession,
	checkSession,
	checkUserExistance,
	getPrices,
	addPrice,
	deletePrice,
	getFlyers,
	addFlyer,
	deleteFlyer,
	deleteSession,
	addUser,
	deleteUser,
	checkUserPassword,
	checkUserGroupId,
	validatePassword,
	validatePasswordInput,
};
