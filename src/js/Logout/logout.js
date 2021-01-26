// Init function
const init = () => {
	// if no session storage redirect to login
	if (!sessionStorage.getItem('loggedInUser')) {
		location = './login.html';
	}

	// Clear session storage
	sessionStorage.clear();
	// Set event listener
	document.querySelector('.log-in-btn').addEventListener('click', () => {
		location = './login.html';
	});
};

init();
