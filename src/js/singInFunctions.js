import { DOM } from "./dom"
import { renderCards } from "./gallery"
import "./img"
import { hideShowElement, changeImg } from "./visibility"
import { URL, constants } from "./constants";
const axios = require("axios");

let userSingUp = {
	first_name: null,
	last_name: null,
	login: null,
	password: null
}
let userSingIn = {
	login: null,
	password: null
}

let countOfValidInputs = 0;

export function singIn(e) {
	e.preventDefault();
		setUserBodyForFequest(userSingIn)
		postSingIn()
}

export function singUp(e) {
	e.preventDefault();
	validation(DOM.singUpInputs)
	if (isValid(DOM.singUpInputs)) {
		setUserBodyForFequest(userSingUp)
		postSingUp()
	}
}

function validation(element) {
	for (let i = 0; i < element.length - 2; i++) {
		if (element[i].value.length < 3) marker(element[i], 'red')
		else {
			if (constants.regExp.test(element[i].value) === false) {
				marker(element[i], 'red')
			} else {
				marker(element[i], 'green')
				countOfValidInputs++
			}
		}
	}
	if (element[element.length - 2].value.length < 3) {
		marker(element[element.length - 2], 'red')
	} else {
		if (constants.regExpLogin.test(element[element.length - 2].value) === false) {
			marker(element[element.length - 2], 'red')
		} else {
			marker(element[element.length - 2], 'green')
			countOfValidInputs++
		}
	}
	if (element[element.length - 1].value.length < 8) {
		marker(element[element.length - 1], 'red')
	} else {
		if (constants.regExpLogin.test(element[element.length - 1].value) === false) {
			marker(element[element.length - 1], 'red')
		} else {
			marker(element[element.length - 1], 'green')
			countOfValidInputs++
		}
	}
}

function isValid(element) {
	if (countOfValidInputs === element.length) {
		countOfValidInputs = 0;
		return true
	}
	console.log(countOfValidInputs)
	countOfValidInputs = 0;
}

function marker(input, color) {
	input.style.boxShadow = `0 0 10px ${color}`
}

async function postSingUp() {
	try {
		let response = await axios.post(URL.signUpURL,
			userSingUp
		);
		if (response.status >= 200 <= 299) {
			DOM.signInRadio.click()
		}
	}
	catch(error)
	{
		if (error.response.status === 406) {
			DOM.messageSignUp.innerHTML = 'This login is already exist';
			marker(DOM.singUpLogin, 'red');
		}
	}
}

async function postSingIn() {
	if ((DOM.singInLogin.value.length >= 3) && (DOM.singInPassword.value.length >= 8)) {
		try {
			let response = await axios.post(URL.signInURL,
				userSingIn
			);
			if (response.status >= 200 <= 299) {
				localStorage.setItem('token', response.headers.token)
				console.log(response.headers)
				isAuthorised()
			}
		} catch (error) {
			DOM.singInInputs.forEach((a) => {
				marker(a, 'red')
			})
		}
	}else{
		marker(DOM.singInLogin, 'red')
		marker(DOM.singInPassword, 'red')
	}
}



function setUserBodyForFequest(obj) {
	if (obj === userSingUp) {
		userSingUp.first_name = DOM.singUpFirstName.value
		userSingUp.last_name = DOM.singUpLastName.value
		userSingUp.login = DOM.singUpLogin.value
		userSingUp.password = DOM.singUpPassword.value
	}
	if (obj === userSingIn) {
		userSingIn.login = DOM.singInLogin.value
		userSingIn.password = DOM.singInPassword.value
	}
}

export function isAuthorised() {
	if (!(localStorage.getItem('token') === 'undefined') && !(localStorage.getItem('token') === null)) {
		hideShowElement(DOM.modalIcon);
		hideShowElement(DOM.mainArea);
		hideShowElement(DOM.searchImg);
		DOM.headerInput.disabled = !DOM.headerInput.disabled;
		changeImg('/img/signOut.png', DOM.loginImg);
		renderCards();
		DOM.singInInputs.forEach((a)=>{
			a.value = '';
		});
		DOM.singUpInputs.forEach((a)=>{
			a.value = '';
		})
	}
}

export function openSignIn() {
	hideShowElement(DOM.preview);
	hideShowElement(DOM.modalIcon);
	isAuthorised();
}

export function signOut() {
	localStorage.removeItem('token')
	DOM.mainArea.classList.value;
	hideShowElement(DOM.mainArea);
	hideShowElement(DOM.searchImg);
	hideShowElement(DOM.preview);
	openSignIn();
	changeImg('/img/iconSignIn.png', DOM.loginImg);
	DOM.headerInput.disabled = true;
}