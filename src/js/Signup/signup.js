// 1. Listen for submit button
// 2. Check each field is not empty - display error
// 3. Check for correct email - error
// 4. Password over 6 chars and 1 num
// 5. Check if passwords match
// 6. POST data and store in DB
// 7. Display success message
// 8. Redirect to login

import { DOMs, strings } from './base';
import * as validationModel from './Models/validation';
import * as dbConnectModel from './Models/dbConnection';
import * as signupView from './View/signupView';

const state = {};

// Signup Control
const signupControll = async (e) => {
	e.preventDefault();
	// Validate form data
	validationModel.formValidation(DOMs.formControls, state);
	// Pass encryption
	state.pass = await validationModel.passControl();
	// if form submitted correctly
	if (state.pass && state.userEmail) {
		// Post data to database
		const createdUser = await dbConnectModel.storeUserData(state);
		// If user posted succesfully
		if (createdUser) {
			// UI message new user added
			signupView.userMsg(DOMs.userMsgEl, DOMs.userMsg, strings.userAdded);
			// redirect to log in page
			setTimeout(() => {
				location.href = './login.html';
			}, 4000);
		} else {
			// UI message - user exists
			signupView.userMsg(DOMs.userMsgEl, DOMs.userMsg, strings.userExists);
		}
	}
};

// Listen for form submit
DOMs.signUpForm.addEventListener('submit', signupControll);
