const PORT = 4000;

const express = require('express');
const path = require('path');
const db = require('./database.client');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:4000',
		exposedHeaders: ['Loggedin', 'Login'],
	})
);
app.use(cookieParser());

const authMiddleware = {
	userAlreadyExists: async function (req, res, next) {
		let userExistance = await db.checkUserExistance(req.body.login);
		if (userExistance) {
			res.status(503).json({
				error: 'userAlreadyExists',
			});
			return;
		}
		console.log('userAlreadyExists check');
		next();
	},
	userNotExists: async function (req, res, next) {
		let userExistance = await db.checkUserExistance(req.body.login);
		if (!userExistance) {
			res.status(503).json({ error: 'userNotExists' });
			return;
		}
		console.log('userExistance check');
		next();
	},
	sessionNotExists: async function (req, res, next) {
		if (req.session) {
			let sessionCheck = await db.checkSession(req.body.login, req.body.session);
			if (!sessionCheck) {
				res.setHeader('Loggedin', 'false');
				res.clearCookie('login', { sameSite: 'none', secure: true });
				res.clearCookie('sessionId', { sameSite: 'none', secure: true });
				res.status(503).json({ error: 'sessionNotExists' });
				return;
			}
		}
		console.log('sessionNotExists check');
		res.setHeader('Login', req.body.login);
		res.setHeader('Loggedin', 'true');
		next();
	},
	sessionNotExistsCookie: async function (req, res, next) {
		let login = req.cookies['login'];
		let sessionId = req.cookies['sessionId'];
		if (login) {
			let sessionCheck = await db.checkSession(login, sessionId);
			if (!sessionCheck) {
				res.setHeader('Loggedin', 'false');
				res.clearCookie('login', { sameSite: 'none', secure: true });
				res.clearCookie('sessionId', { sameSite: 'none', secure: true });
				res.status(503).json({ error: 'sessionNotExists' });
				return;
			}
		}
		res.setHeader('Login', login);
		res.setHeader('Loggedin', 'true');
		console.log('sessionNotExists check');
		next();
	},
	password: async function (req, res, next) {
		let passwordCheck = await db.checkUserPassword(req.body.login, req.body.password);
		if (!passwordCheck) {
			res.status(503).json({ error: 'wrongPassword' });
			return;
		}
		console.log('passwordCheck check');
		next();
	},
};
const accessMiddleware = {
	mustBeAdmin: async function (req, res, next) {
		let login = req.cookies['login'];
		let session = req.cookies['Sessionid'];
		let checkSession = await db.checkSession(login, session);
		if (!checkSession) {
			res.locals.admin = false;
			next();
		}
		let userGroup = await db.checkUserGroupId(login, 'admin');
		if (!userGroup) {
			res.locals.admin = false;
			next();
		}
		res.locals.admin = true;
		next();
	},
};
const sessionCheckMiddleware = {
	sessionExistsCookie: async function (req, res, next) {
		let login = req.cookies['login'];
		let sessionId = req.cookies['sessionId'];
		console.log('sessionExists check', req.originalUrl, login, sessionId);
		if (login !== undefined && sessionId !== undefined) {
			let sessionCheck = await db.checkSession(login, sessionId);
			console.log('session check result', sessionCheck);
			if (sessionCheck) {
				console.log('writing cookies');
				writeCookie(res, req, login, sessionId);
			} else {
				console.log('deleting cookies no session');
				deleteCookie(res, req);
			}
		} else {
			console.log('deleting cookies', login, sessionId);
			deleteCookie(res, req);
		}
		next();
	},
};
const validationMiddleware = {
	passwordValidations: async function (req, res, next) {
		let passwordValidations = await db.validatePasswordInput(req.body.password);
		for (let [key, value] in Object.entries(passwordValidations)) {
			if (value !== undefined) {
				res.status(503).json({ error: 'incorrectPassword' });
				return;
			}
		}
		console.log('passwordValidations check');
		next();
	},
};
function writeCookie(res, req, login, session) {
	const cookieLogin = req.cookies['login'];
	const cookieSession = req.cookies['sessionId'];
	res.removeHeader('Set-Cookie');
	res.setHeader('Login', login);
	res.setHeader('Loggedin', 'true');
	if (cookieLogin !== login || cookieSession !== session) {
		console.log('rewriting');
		res.cookie('login', login, { sameSite: 'none', secure: true, httpOnly: false });
		res.cookie('sessionId', session, { sameSite: 'none', secure: true, httpOnly: false });
	}
	res.locals.session = true;
	res.locals.login = login;
	res.locals.session = session;
	console.log('writing cookies to res');
}
function deleteCookie(res, req) {
	res.removeHeader('Set-Cookie');
	res.setHeader('Loggedin', 'false');
	res.clearCookie('login', { sameSite: 'none', secure: true });
	res.clearCookie('sessionId', { sameSite: 'none', secure: true });
	res.locals.session = false;
}
app.use(express.static('./build'));
app.post('*', sessionCheckMiddleware.sessionExistsCookie);
//UPDATE
app.post(
	'/addUser',
	[express.json(), authMiddleware.userAlreadyExists, validationMiddleware.passwordValidations],
	async (req, res, next) => {
		let userRegistration = await db.addUser(req.body.login, req.body.password, 'user');
		if (res.locals.session) {
			res.status(503).json({ error: 'alreadyRegistred' });
		}
		if (!userRegistration) {
			res.status(503).json({ error: 'databaseError' });
		}
		let newSession = await db.addSession(req.body.login);
		if (!newSession.affected) {
			res.status(503).json({ error: 'databaseError' });
		}
		writeCookie(res, req, req.body.login, newSession.id);
		res.status(200).send();
	}
);
// app.post(
// 	'/deleteUser',
// 	[express.json(), , accessMiddleware.mustBeAdmin, authMiddleware.userNotExists],
// 	async (req, res) => {
// 		const login = req.body.login;
//     const userLogin = req.body.userLogin;
// 		let userDeletion = await db.deleteUser(login);
// 		if (!userDeletion) {
// 			res.status(503).json({ rejected: 'deleteUser', stage: 'db', reason: 'db' });
// 			return;
// 		}
// 		res.status(200).send();
// 	}
// );
// app.get('/confirmation/:id', async (req, res) => {
// 	const confirmationId = req.params.id;
// 	let confirmation = await db.confirmSession(confirmationId);
// 	if (!confirmation) {
// 		res.status(503).json({ error: 'confirmationExpired' });
// 	}
// 	let activateUser = await db.activateUser(confirmationId);
// 	if (!activateUser.affected) {
// 		res.status(503).json({ error: 'activationError' });
// 	}
// 	let newSession = await db.addSession(req.body.login);
// 	if (!newSession.affected) {
// 		res.status(503).json({ error: 'databaseError' });
// 	}
// 	res.cookie('login', activateUser.login);
// 	res.cookie('sessionId', newSession.id);
// 	res.status(200).send();
// });
app.post(
	'/login',
	[express.json(), authMiddleware.userNotExists, authMiddleware.password],
	async (req, res, next) => {
		let newSession = await db.addSession(req.body.login);
		console.log('new session', newSession);
		if (!newSession.affected) {
			res.status(503).json({ error: 'databaseError' });
		}
		writeCookie(res, req, req.body.login, newSession.id);
		res.status(200).send();
	}
);
app.post('/unlogin', express.json(), async (req, res) => {
	const cookieLogin = req.cookies['login'];
	const cookieSession = req.cookies['Sessionid'];
	await db.deleteSession(cookieLogin, cookieSession);
	deleteCookie(res, req);
	res.status(200).send();
});
app.post('/addFlyer', [express.json(), accessMiddleware.mustBeAdmin], async (req, res) => {
	if (!res.locals.session || !res.locals.admin) {
		res.status(503).json({ error: 'notPermitted' });
	}
	const flyer = req.body.flyer;
	let insertionResult = await addFlyer(flyer);
	if (insertionResult.affected) {
		res.status(200).send();
	} else {
		res.status(503).json({ error: 'databaseError' });
	}
});
app.post('/deleteFlyer', [express.json(), accessMiddleware.mustBeAdmin], async (req, res) => {
	if (!res.locals.session || !res.locals.admin) {
		res.status(503).json({ error: 'notPermitted' });
	}
	const id = req.body.id;
	let deletionResult = await db.deleteFlyer(id);

	if (deletionResult.affected) {
		res.status(200).send();
	} else {
		res.status(503).json({ error: 'databaseError' });
	}
});

//READ
app.post('/paths', express.json(), async (req, res) => {
	let userGroupId = 'user';
	console.log('checks', res.locals);
	if (res.locals.session) {
		userGroupId = await db.getGroupId(res.locals.login);
		console.log('usergroupid', userGroupId);
	}
	let pathRows = await db.getPaths(userGroupId);
	let resObject = {};
	pathRows.forEach((pathRow) => {
		resObject[pathRow.component] = pathRow.path;
	});
	res.status(200).json(JSON.stringify(resObject));
});
app.post('/flyers', express.json(), async (req, res) => {
	const language = req.body.language;
	let flyerRows = await db.getFlyers(language);
	res.status(200).json(JSON.stringify(flyerRows.rows));
});
app.post('/prices', express.json(), async (req, res) => {
	let priceRows = await db.getPrices(req.body.paths, req.body.language);

	let resObject = {};
	resObject = { ...priceRows.rows };
	priceRows.rows.forEach((priceRow) => {
		//creating normalized data
		if (!resObject.hasOwnProperty(priceRow.path)) {
			resObject[priceRow.path] = [];
		}
		resObject[priceRow.path].push(priceRow);
	});
	res.status(200).json(JSON.stringify(resObject));
});
app.post('/serviceDescriptions', express.json(), (req, res) => {
	let locale = req.body.locale;
	const serviceDescriptions = require('./serviceDescriptions.json');
	if (translations.hasOwnProperty(locale)) {
		res.status(200).json(JSON.stringify(serviceDescriptions[locale].serviceDescriptions));
	} else {
		res.status(404);
	}
});
// app.post('/translations', express.json(), (req, res) => {
// 	let locale = req.body.locale;
// 	const translations = require('./translations.json');
// 	console.log('translations req', req.body);
// 	if (translations.hasOwnProperty(locale)) {
// 		res.status(200).json(JSON.stringify(translations[locale]));
// 	} else {
// 		res.status(404);
// 	}
// });
//REWRITES
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));
//SERVER
let server = app.listen(PORT, function () {
	console.log(`Server is running on ${PORT}`);
});
