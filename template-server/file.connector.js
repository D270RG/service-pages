const fs = require('fs');

function updateJSON(fileName, mutationCallback) {
	const json = require(fileName);
	mutationCallback(json);
	fs.writeFile(fileName, JSON.stringify(json), function writeToJSON(err) {
		if (err) return console.log(err);
		console.log(JSON.stringify(json));
		console.log('writing to ' + fileName);
	});
}

module.exports = { updateJSON };
