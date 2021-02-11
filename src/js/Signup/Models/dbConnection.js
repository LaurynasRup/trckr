// Store user
export const storeUserData = async (obj) => {
	try {
		const response = await fetch('http://localhost:5000/api/users/insert', {
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods':
					'GET, POST, PATCH, DELETE, PUT, OPTIONS',
				'Access-Control-Allow-Headers':
					'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
			},
			method: 'POST',
			body: JSON.stringify({
				name: obj.userName,
				email: obj.userEmail,
				password: obj.pass,
			}),
		});
		const data = await response.json();
		return true;
	} catch (err) {
		return false;
	}
};
