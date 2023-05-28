const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: 'root',
	password: 'root',
	database: 'service',
	connectionLimit: 5,
});

async function read(query) {
	let conn;
	try {
		conn = await pool.getConnection();

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

		const res = await conn.query(query);
		return res.changedRows;
	} finally {
		if (conn) conn.release();
	}
}

module.exports = { read, set };
