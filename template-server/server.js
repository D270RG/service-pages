const PORT = 4000;

const express = require('express');
const cors = require('cors');
const translations = require('./translations.json');
const db = require('./database.client');
const fc = require('./file.connector');
const app = express();

const corsOptions = {
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*',
	preflightContinue: true,
};

app.use(cors(corsOptions));

async function bodyParser(req, callback) {
	req.setEncoding('utf8');
	const rb = [];
	req.on('data', (chunks) => {
		rb.push(chunks);
	});
	req.on('end', function (result) {
		return callback(rb[0]);
	});
}
async function bodyParserWrap(req) {
	return new Promise((resolve, reject) => {
		bodyParser(req, function (result) {
			resolve(result);
		});
	});
}
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
	console.log('requrested descs', locale);
	if (translations.hasOwnProperty(locale)) {
		console.log('sending descriptions', locale);
		res.status(200).json(JSON.stringify(translations[locale].serviceDescriptions));
	} else {
		res.status(404);
	}
});
app.post('/translations', express.json(), (req, res) => {
	let locale = req.body.locale;
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
