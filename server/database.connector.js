const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'service',
	connectionLimit: 5,
});

async function read(query) {
	let conn;
	try {
		conn = await pool.getConnection();
		console.log('query', query);
		const rows = await conn.query(query);
		return rows;
	} finally {
		if (conn) conn.release();
	}
}

async function set(query) {
	let conn;
	try {
		conn = await pool.getConnection();
		console.log('query', query);
		const res = await conn.query(query);
		return res.changedRows;
	} finally {
		if (conn) conn.release();
	}
}

module.exports = { read, set };
