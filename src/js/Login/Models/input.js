const bcrypt = require('bcryptjs');

export const validateInput = (arr, obj, fn) => {
	arr.forEach((input) => {
		const inputValue = input.firstElementChild;
		const errroMsg = input.lastElementChild;
		if (input.firstElementChild.id === 'log-in-email') {
			// check if email field is not empty
			if (inputValue.value !== '') {
				// Validate correct email structure
				if (checkEmail(inputValue.value)) {
					obj.inputUserEmail = inputValue.value;
					inputValue.value = '';
					errroMsg.innerText = '';
				} else {
					errroMsg.innerText = '* Please enter correct email address';
				}
			} else {
				errroMsg.innerText = '* Please enter your email address';
			}
		} else if (input.firstElementChild.id === 'log-in-pass') {
			// Check if pass is not empty
			if (inputValue.value !== '') {
				// Regex to remove special chars
				const trimmedInput = removeSpecChars(inputValue.value);
				if (trimmedInput.length >= 6) {
					storePass(trimmedInput, obj);
					inputValue.value = '';
					errroMsg.innerText = '';
				} else {
					errroMsg.innerText = '* Password must be at least 6 characters';
				}
			} else {
				errroMsg.innerText = '* Please enter your password';
			}
		}
	});
};

// Function to validate Login details
export const validateUser = async (inputObj, dbObj, inputs) => {
	const formInput = inputs[0].firstElementChild.value;
	const errMsg = inputs[0].lastElementChild;
	// if user was not found
	if (!dbObj && !errMsg.innerText) {
		errMsg.innerText = '* User does not exist';
	} else if (dbObj.email) {
		// If user was found - handle
		matchPass(inputObj, dbObj, inputs);
	}
};

// Function to fetch data from database
export const fetchData = async (mail) => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/users/getUser/${mail}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		const data = await response.json();
		if (data) {
			const { email, password } = data;
			return { email, password };
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
	}
	// if (data.data[0]) {
	// 	const { email, password } = data.data[0];
	// 	return {
	// 		email: email,
	// 		password: password,
	// 	};
	// } else {
	// 	return false;
	// }
};

// Reg Ex for email
const checkEmail = (str) => {
	const regex = /^\S+@\S+$/;
	return regex.test(str);
};

// Reg Ex to remove special chars
const removeSpecChars = (str) => {
	let newstr = str.trim();
	newstr = newstr.replace(/[^\w\s]/gi, '');
	return newstr;
};

// Store pass
const storePass = (plainPass, obj) => {
	obj.inputPass = plainPass;
};

// To match encrypted pass
const matchPass = async (inputObj, dbObj, inputs) => {
	const isMatch = await bcrypt.compare(inputObj.inputPass, dbObj.password);
	if (!isMatch) {
		inputs[1].lastElementChild.innerText = '* Password does not match';
	} else {
		sessionStorage.setItem('loggedInUser', JSON.stringify(dbObj.email));
		location.href = './leagues.html';
	}
};
