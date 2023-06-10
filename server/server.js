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
	sessionAlreadyExists: async function (req, res, next) {
		if (req.session) {
			let sessionCheck = await db.checkSession(req.body.login, req.body.session);
			if (sessionCheck) {
				res.setHeader('Login', req.body.login);
				res.setHeader('Loggedin', 'true');
				res.cookie('login', req.body.login, { sameSite: 'none', secure: true, httpOnly: false });
				res.cookie('sessionId', req.body.session, {
					sameSite: 'none',
					secure: true,
					httpOnly: false,
				});
				res.status(200).send();
				return;
			}
		}
		res.setHeader('Loggedin', 'false');
		console.log('sessionAlreadyExists check');
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
	// Must be used in pair with authMiddleware.sessionNotExists to ensure admin user is logged in
	mustBeAdmin: async function (req, res, next) {
		let userGroup = await db.checkUserGroupId(req.body.login, 'admin');
		if (!userGroup) {
			res.status(503).json({ error: 'notPermitted' });
			return;
		}
		console.log('mustBeAdmin check');
		next();
	},
};
const sessionCheckMiddleware = {
	sessionExistsCookie: async function (req, res, next) {
		let login = req.cookies['login'];
		let sessionId = req.cookies['sessionId'];
		if (login !== undefined && sessionId !== undefined) {
			let sessionCheck = await db.checkSession(login, sessionId);
			if (sessionCheck) {
				res.locals.sessionExists = true;
				console.log('sessionExists check cookie passed', sessionCheck);
				res.setHeader('Login', login);
				res.setHeader('Loggedin', 'true');
				next();
			} else {
				res.setHeader('Loggedin', 'false');
				res.clearCookie('login', { sameSite: 'none', secure: true });
				res.clearCookie('sessionId', { sameSite: 'none', secure: true });
				res.locals.session = false;
				console.log('sessionExists check failed');
				next();
			}
		} else {
			res.setHeader('Loggedin', 'false');
			res.clearCookie('login', { sameSite: 'none', secure: true });
			res.clearCookie('sessionId', { sameSite: 'none', secure: true });
			res.locals.session = false;
			console.log('sessionExists check failed');
			next();
		}
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
app.use(express.static('./build'));
//UPDATE
app.post(
	'/addUser',
	[
		express.json(),
		sessionCheckMiddleware.sessionExistsCookie,
		authMiddleware.userAlreadyExists,
		validationMiddleware.passwordValidations,
	],
	async (req, res) => {
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
		res.setHeader('Login', req.body.login);
		res.setHeader('Loggedin', 'true');
		res.cookie('login', req.body.login, { sameSite: 'none', secure: true, httpOnly: false });
		res.cookie('sessionId', newSession.id, { sameSite: 'none', secure: true, httpOnly: false });
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
	[
		express.json(),
		authMiddleware.sessionAlreadyExists,
		authMiddleware.userNotExists,
		authMiddleware.password,
	],
	async (req, res) => {
		let newSession = await db.addSession(req.body.login);
		if (newSession.affected) {
			console.log('login 200');
			res.setHeader('Login', req.body.login);
			res.setHeader('Loggedin', 'true');
			res.cookie('login', req.body.login, { sameSite: 'none', secure: true });
			res.cookie('sessionId', newSession.id, { sameSite: 'none', secure: true });
			res.status(200).send();
		} else {
			console.log('login 503');
			res.status(503).json({ error: 'databaseError' });
		}
	}
);
app.post('/unlogin', [express.json()], async (req, res) => {
	await db.deleteSession(req.cookies['login'], req.cookies['sessionId']);
	res.setHeader('Loggedin', 'false');
	res.clearCookie('login', { sameSite: 'none', secure: true });
	res.clearCookie('sessionId', { sameSite: 'none', secure: true });
	res.status(200).send();
});
app.post(
	'/addFlyer',
	[express.json(), authMiddleware.sessionNotExistsCookie, accessMiddleware.mustBeAdmin],
	async (req, res) => {
		const flyer = req.body.flyer;
		let insertionResult = await addFlyer(flyer);
		if (insertionResult.affected) {
			res.status(200).send();
		} else {
			res.status(503).json({ error: 'databaseError' });
		}
	}
);
app.post('/deleteFlyer', [express.json(), accessMiddleware.mustBeAdmin], async (req, res) => {
	const id = req.body.id;
	let deletionResult = await db.deleteFlyer(id);

	if (deletionResult.affected) {
		res.status(200).send();
	} else {
		res.status(503).json({ error: 'databaseError' });
	}
});

//READ
app.post(
	'/paths',
	[express.json(), sessionCheckMiddleware.sessionExistsCookie],
	async (req, res) => {
		let userGroupId = 'user';
		if (res.locals.session) {
			userGroupId = await db.getUserGroupId(req.body.login);
		}
		let pathRows = await db.getPaths(userGroupId);
		let resObject = {};
		pathRows.forEach((pathRow) => {
			resObject[pathRow.component] = pathRow.path;
		});
		console.log('sending paths', resObject);
		res.status(200).json(JSON.stringify(resObject));
	}
);
app.post(
	'/flyers',
	sessionCheckMiddleware.sessionExistsCookie,
	express.json(),
	async (req, res) => {
		const language = req.body.language;
		let flyerRows = await db.getFlyers(language);
		res.status(200).json(JSON.stringify(flyerRows.rows));
	}
);
app.post(
	'/prices',
	sessionCheckMiddleware.sessionExistsCookie,
	express.json(),
	async (req, res) => {
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
	}
);
app.post(
	'/serviceDescriptions',
	sessionCheckMiddleware.sessionExistsCookie,
	express.json(),
	(req, res) => {
		let locale = req.body.locale;
		const serviceDescriptions = require('./serviceDescriptions.json');
		if (translations.hasOwnProperty(locale)) {
			res.status(200).json(JSON.stringify(serviceDescriptions[locale].serviceDescriptions));
		} else {
			res.status(404);
		}
	}
);
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
