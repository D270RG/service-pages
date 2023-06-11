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
		conn.query('SET GLOBAL connect_timeout=28800');
		conn.query('SET GLOBAL interactive_timeout=28800');
		conn.query('SET GLOBAL wait_timeout=28800');
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
		conn.query('SET GLOBAL connect_timeout=28800');
		conn.query('SET GLOBAL interactive_timeout=28800');
		conn.query('SET GLOBAL wait_timeout=28800');
		const rows = await conn.query(query);
		return rows;
	} finally {
		if (conn) conn.release();
	}
}

module.exports = { read, set };
