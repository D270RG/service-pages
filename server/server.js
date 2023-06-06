const PORT = 4000;

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database.client');
const nodemailer = require('nodemailer');
const app = express();

const corsOptions = {
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*',
	preflightContinue: true,
};

app.use(cors(corsOptions));
app.use(express.static('./build'));

const authMiddleware = {
	userAlreadyExists: async function (req, res, next) {
		let userExistance = await db.checkUserExistance(req.body.login);
		if (userExistance) {
			res.status(503).json({
				error: 'userAlreadyExists',
			});
			return;
		}
		next();
	},
	userNotExists: async function (req, res, next) {
		let userExistance = await db.checkUserExistance(req.body.login);
		if (!userExistance) {
			res.status(503).json({ error: 'userNotExists' });
			return;
		}
		next();
	},
	sessionNotExists: async function (req, res, next) {
		if (req.session) {
			let sessionCheck = await db.checkSession(req.body.login, req.body.session);
			if (!sessionCheck) {
				res.status(503).json({ error: 'sessionNotExists' });
				return;
			}
		}
		next();
	},
	sessionAlreadyExists: async function (req, res, next) {
		if (req.session) {
			let sessionCheck = await db.checkSession(req.body.login, req.body.session);
			if (sessionCheck) {
				res.cookie('login', req.body.login);
				res.cookie('sessionId', req.body.session);
				res.status(200);
				return;
			}
		}
		next();
	},
	password: async function (req, res, next) {
		let passwordCheck = await db.checkUserPassword(req.body.password);
		if (!passwordCheck) {
			res.status(503).json({ error: 'wrongPassword' });
			return;
		}
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
		next();
	},
};
const sessionCheckMiddleware = {
	sessionExists: async function (req, res, next) {
		if (req.body.session) {
			let sessionCheck = await db.checkSession(req.body.login, req.body.session);
			if (sessionCheck) {
				res.locals.sessionExists = true;
				next();
			}
		}
		res.locals.session = false;
		next();
	},
};
const validationMiddleware = {
	loginValidations: async function (req, res, next) {
		let loginValidation = await db.validateLogin(req.body.login);
		if (!loginValidation.valid) {
			res.status(503).json({ error: 'incorrectLogin' });
			return;
		}
		next();
	},
	passwordValidations: async function (req, res, next) {
		let passwordValidations = await db.validatePasswordInput(req.body.password);
		for (let [key, value] in Object.entries(passwordValidations)) {
			if (!value) {
				res.status(503).json({ error: 'incorrectPassword' });
				return;
			}
		}
		next();
	},
};
//UPDATE
app.post(
	'/addUser',
	[
		express.json(),
		authMiddleware.userAlreadyExists,
		validationMiddleware.loginValidations,
		validationMiddleware.passwordValidations,
	],
	async (req, res) => {
		let userRegistration = await db.addUser(req.body.login, req.body.password);
		if (!userRegistration) {
			res.status(503).json({ error: 'databaseError' });
		}
		let newExpirationSession = await db.addExpiration(req.body.login);
		nodemailer.sendConfirmationEmail(req.body.login, newExpirationSession.confirmationId);
		res.status(200);
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
// 		res.status(200);
// 	}
// );
app.get('/confirmation/:id', async (req, res) => {
	const confirmationId = req.params.id;
	let confirmation = await db.confirmSession(confirmationId);
	if (!confirmation) {
		res.status(503).json({ error: 'confirmationExpired' });
	}
	let activateUser = await db.activateUser(confirmationId);
	if (!activateUser.affected) {
		res.status(503).json({ error: 'activationError' });
	}
	let newSession = await db.addSession(req.body.login);
	if (!newSession.affected) {
		res.status(503).json({ error: 'databaseError' });
	}
	res.cookie('login', activateUser.login);
	res.cookie('sessionId', newSession.id);
	res.status(200);
});
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
			res.cookie('login', activateUser.login);
			res.cookie('sessionId', newSession.id);
			res.status(200);
		} else {
			res.status(503).json({ error: 'databaseError' });
		}
	}
);

app.post(
	'/addFlyer',
	[express.json(), authMiddleware.sessionNotExists, accessMiddleware.mustBeAdmin],
	async (req, res) => {
		const flyer = req.body.flyer;
		let insertionResult = await addFlyer(flyer);
		if (insertionResult.affected) {
			res.status(200);
		} else {
			res.status(503).json({ error: 'databaseError' });
		}
	}
);
app.post(
	'/deleteFlyer',
	[express.json(), authMiddleware.sessionNotExists, accessMiddleware.mustBeAdmin],
	async (req, res) => {
		const id = req.body.id;
		let deletionResult = await db.deleteFlyer(id);

		if (deletionResult.affected) {
			res.status(200);
		} else {
			res.status(503).json({ error: 'databaseError' });
		}
	}
);

//READ
app.post('/paths', [express.json(), sessionCheckMiddleware.sessionExists], async (req, res) => {
	let userGroupId = 'user';
	if (res.locals.session) {
		userGroupId = await db.getUserGroupId(req.body.login);
	}
	let pathRows = await db.getPaths(userGroupId);
	let resObject = {};
	pathRows.forEach((pathRow) => {
		resObject[pathRow.component] = pathRow.path;
	});
	console.log('sending', resObject, 'pathRow', pathRows);
	res.status(200).json(JSON.stringify(resObject));
});
app.post('/flyers', express.json(), async (req, res) => {
	console.log('app post flyers');
	const language = req.body.language;
	console.log('received lang', language);
	let flyerRows = await db.getFlyers(language);
	console.log('flyer rows', flyerRows);
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
	console.log('sending');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.status(200).json(JSON.stringify(resObject));
});
app.post('/serviceDescriptions', express.json(), (req, res) => {
	let locale = req.body.locale;
	const serviceDescriptions = require('./serviceDescriptions.json');
	console.log('requrested descs', locale);
	if (translations.hasOwnProperty(locale)) {
		console.log('sending descriptions', locale);
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
