export const fetchData = async (email) => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/users/getUser/${email}`
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
