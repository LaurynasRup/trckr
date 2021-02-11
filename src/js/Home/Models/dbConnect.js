export const fetchData = async (email) => {
	try {
		const response = await fetch(
			`https://trckr-server.herokuapp.com/api/users/getUser/${email}`
		);
		const data = await response.json();
		if (!data.liked_leagues) {
			return false;
		} else {
			return data.liked_leagues;
		}
	} catch (err) {
		throw err;
	}
};
