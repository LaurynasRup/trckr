const mysql = require('mysql');
const dotenv = require('dotenv');
// const { reject } = require('core-js/fn/promise');
let instance = null;
dotenv.config();

// Create connection
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	}
	console.log('db ' + connection.state);
});

class DbService {
	static getDbServiceInstance() {
		return instance ? instance : new DbService();
	}
	async getAllData() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM users';

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});

			// console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	async getSelectedData(email) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM users WHERE email = ?;';

				connection.query(query, email, (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	async storeUserData(arr) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					'INSERT INTO users (name, email, password) VALUES (?,?,?);';

				connection.query(query, arr, (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	async getUserLeagues(email) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT liked_leagues FROM users WHERE email = ?;';

				connection.query(query, email, (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	async storeUserLeagues(arr) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'UPDATE users SET liked_leagues = ? WHERE email = ?;';

				connection.query(query, arr, (err, result) => {
					if (err) reject(new Error(err.message));
					resolve(result);
				});
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = DbService;
