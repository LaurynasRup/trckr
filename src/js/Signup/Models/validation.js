const bcrypt = require('bcryptjs');

// Validate Form
export const formValidation = async (arr, obj) => {
    state.pass2 = '';
    arr.forEach(control => {
        const input = control.firstElementChild;
        const errorField = control.lastElementChild;
        const placehold = control.firstElementChild.placeholder;
        // Clear errors
        errorField.innerText = '';
        // Check for empty fields
        emptyFields(input, errorField, placehold);
        // Validate name
        validateName(input, obj);
        // Validate email address
        validateEmail(input, errorField, obj);
        // Password validation
        validatePass(input, errorField, placehold, obj);
    });
};

export const passControl = async () => {
    if(state.pass2) {
        const hashedPass = await hashPass(state.pass2);
        return hashedPass;
    };
};

// Check if fields are empty 
const emptyFields = (input, err, plc) => {
    if(input.value === '') {
        err.innerText = `* Please enter ${plc}`
    };
};

// Validate name
const validateName = (input, obj) => {
    if(input.id === 'sign-up-name') {
        const validatedName = removeSpecChars(input.value);
        obj.userName = validatedName;
    }
};

// Email validation
const validateEmail = (input, err, obj) => {
    if(input.id === 'sign-up-email') {
        if(!checkEmail(input.value) && input.value !== '') {
            err.innerText = 'Please enter a correct Email Address';
        } else {
            obj.userEmail = input.value;
        };
    };
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

// Validate both Passwords
const validatePass = async (input, err, plc) => {
    let errCount = false;
    
    if(input.id === 'sign-up-pass') {
        const validatedInput = removeSpecChars(input.value)
        // Pass must have > 6 Chars & 1 num
        if(!checkPass(validatedInput) && validatedInput !== '') {
            err.innerText = `* ${plc} must contain 8 characters and 1 number`;
            errCount = true
        } else {
            state.pass1 = validatedInput;
        };
    };

    // If second pass matches
    if(input.id === 'sign-up-pass2' && !errCount) {
        const validatedInput = removeSpecChars(input.value)
        if(validatedInput !== '') {
            if(state.pass1 !== validatedInput) {
                err.innerText = '* Passwords do not match'
            } else {
                err.innerText = '';
                state.pass1 = '';
                state.pass2 = validatedInput;
            };
        };
    };   
};

const checkPass = (str) => {
    // Password regex
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(str);
}

const hashPass = async (pass) => {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass;
};

const state = {};

