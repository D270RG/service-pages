const PORT = 4000;

const express = require('express');
const cors = require('cors');
const db = require('./database.client');
const fc = require('./file.connector');
const app = express();

const corsOptions = {
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*',
	preflightContinue: true,
};

app.use(cors(corsOptions));

// TODO:
// app.get('/paths', (req, res) => {
// 	db.getPaths().then((pathRows) => {
// 		let resObject = {};
// 		pathRows.forEach((pathRow) => {
// 			resObject[pathRow.component] = pathRow.path;
// 		});
// 		res.status(200), json(JSON.stringify(resObject));
// 	});
// });

//UPDATE
app.post('/addFlyer', express.json(), (req, res) => {
	const flyer = req.body.flyer;
	db.addFlyer(flyer).then((insertionResult) => {
		if (insertionResult.rows) {
			const insertion1 = fc.insertJSON(
				'translations',
				['ru-RU', 'tabs', 'home', 'titles', insertionResult.id],
				flyer.title
			);
			const insertion2 = fc.insertJSON(
				'translations',
				['ru-RU', 'tabs', 'home', 'texts', insertionResult.id],
				flyer.text
			);
			if (insertion1 && insertion2) {
				res.status(200);
			} else {
				res.status(503);
			}
		} else {
			res.status(503);
		}
	});
});
app.post('/deleteFlyer', express.json(), (req, res) => {
	const id = req.body.id;
	db.deleteFlyer(id).then((deletionResult) => {
		if (deletionResult.rows) {
			const deletion1 = fc.deleteJSON('translations', ['ru-RU', 'tabs', 'home', 'titles', id]);
			const deletion2 = fc.deleteJSON('translations', ['ru-RU', 'tabs', 'home', 'texts', id]);
			if (deletion1 && deletion2) {
				res.status(200);
			} else {
				res.status(503);
			}
		} else {
			res.status(503);
		}
	});
});

//READ
app.get('/flyers', (req, res) => {
	db.getFlyers().then((flyerRows) => {
		res.status(200).json(JSON.stringify(flyerRows));
	});
});
app.post('/prices', express.json(), (req, res) => {
	db.getPrices(req.body.paths).then((priceRows) => {
		let resObject = {};
		resObject = { ...priceRows };
		priceRows.forEach((priceRow) => {
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
app.post('/translations', express.json(), (req, res) => {
	let locale = req.body.locale;
	const translations = require('./translations.json');
	console.log('translations req', req.body);
	if (translations.hasOwnProperty(locale)) {
		res.status(200).json(JSON.stringify(translations[locale]));
	} else {
		res.status(404);
	}
});
let server = app.listen(PORT, function () {
	console.log(`Server is running on ${PORT}`);
});
