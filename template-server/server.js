const PORT = 4000;
let globalFlags = {
	mapUpdate: false,
};
const express = require('express');
const cors = require('cors');
const path = require('path');

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

app.post('/prices', (req, res) => {
	let exampleResponse = {
		'first-help': [
			{ id: '123', type: 'Repair', price: 10, currency: 'rub', amount: 1, descriptionId: '123' },
			{
				id: '1234',
				type: 'Repair',
				price: 100,
				currency: 'rub',
				amount: 1,
				descriptionId: '1234',
			},
			{
				id: '12345',
				type: 'Repair',
				price: 1000,
				currency: 'rub',
				amount: 1,
				descriptionId: '12345',
			},
		],
		'laptop-repair': [
			{
				id: '456',
				type: 'Windows',
				price: 1000,
				currency: 'rub',
				amount: 1,
				descriptionId: '456',
			},
			{
				id: '4567',
				type: 'Windows',
				price: 100000,
				currency: 'rub',
				amount: 1,
				descriptionId: '4567',
			},
		],
		'phone-repair': [
			{
				id: '789',
				type: 'Android',
				price: 300,
				currency: 'rub',
				amount: 1,
				descriptionId: '789',
			},
			{
				id: '78910',
				type: 'Android',
				price: 200,
				currency: 'rub',
				amount: 1,
				descriptionId: '78910',
			},
			{
				id: '7891011',
				type: 'Android',
				price: 11,
				currency: 'rub',
				amount: 1,
				descriptionId: '7891011',
			},
			{
				id: '789101112',
				type: 'Android',
				price: 10000,
				currency: 'rub',
				amount: 1,
				descriptionId: '789101112',
			},
		],
	};
	console.log('sending');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.status(200).json(exampleResponse);
});

let server = app.listen(PORT, function () {
	console.log(`Server is running on ${PORT}`);
});
