const fs = require('fs');

//Utils
function isObject(obj) {
	if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
		return true;
	} else {
		return false;
	}
}

function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
}

function deletePropertyPath(obj, path) {
	if (!obj || !path) {
		return;
	}

	for (var i = 0; i < path.length - 1; i++) {
		obj = obj[path[i]];

		if (typeof obj === 'undefined') {
			return;
		}
	}

	delete obj[path.pop()];
}

//Actions
function insertJSON(fileName, paths, value) {
	if (typeof value !== string) return false; //type security check

	const json = require(fileName);
	let constructedObject = {};

	paths.reduce(function (constructedObject, path, index) {
		if (index === paths.length - 1) {
			return (constructedObject[path] = value);
		} else {
			return (constructedObject[path] = {});
		}
	}, constructedObject);

	const mergedJson = JSON.stringify(mergeDeep(json, constructedObject));
	fs.writeFile(fileName, mergedJson, function writeToJSON(err) {
		if (err) return false;
		console.log(JSON.stringify(json));
		console.log('writing to ' + fileName);
	});
	return true;
}

function deleteJSON(fileName, paths) {
	const json = require(fileName);
	deletePropertyPath(json, paths);
	fs.writeFile(fileName, json, function writeToJSON(err) {
		if (err) return false;
		console.log(JSON.stringify(json));
		console.log('writing to ' + fileName);
	});
	return true;
}

module.exports = { insertJSON, deleteJSON };
