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

	// if(!data.data[0].liked_leagues) {
	//     return false;
	// } else {
	//     return data.data[0].liked_leagues;
	// };
};

export const storeData = async (str, email) => {
	const response = await fetch(
		`https://trckr-server.herokuapp.com/api/leagues/store_leagues`,
		{
			headers: {
				'Content-type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				email: email,
				str: str,
			}),
		}
	);
	const data = await response.json();
};
