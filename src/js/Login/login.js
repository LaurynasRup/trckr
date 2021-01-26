import { DOMs } from './base';
import * as inputModel from './Models/input';
import * as inputView from './View/inputView';

// Init obj to store input info
const userInput = {};

// log in Controller
const loginController = async (e) => {
	e.preventDefault();

	// Validate Input Fields & store data in userInput obj
	inputModel.validateInput(DOMs.inputs, userInput);

	// Retrieve details from database
	const databaseDetails = await inputModel.fetchData(
		userInput.inputUserEmail,
		userInput
	);
	// console.log(databaseDetails, userInput);

	// Validate log in details & redirect
	inputModel.validateUser(userInput, databaseDetails, DOMs.inputs);
};

const init = () => {
	// Redirect if seesion stored
	if (sessionStorage.getItem('loggedInUser')) {
		location = 'leagues.html';
	}
	// Listen for form submit
	DOMs.loginForm.addEventListener('submit', loginController);
};

init();
