import { DOM } from "./dom"
import { renderCards } from "./gallery"
import "./img"
import { hideForm, showForm, changeImg } from "./visibility"
import {constants} from "./constants";


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
	validation(DOM.singInInputs)
	if (isValid(DOM.singInInputs)) {
		setUserBodyForFequest(userSingIn)
		postSingIn()
	}
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
		}else{
			marker(element[element.length - 2], 'green')
			countOfValidInputs++
		}
	}
	if (element[element.length - 1].value.length < 8) {
		marker(element[element.length - 1], 'red')
	} else {
		marker(element[element.length - 1], 'green')
		countOfValidInputs++
	}
}

function isValid(element) {
	if (countOfValidInputs === element.length) {
		console.log(element.length)
		console.log(countOfValidInputs)
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
	let response = await fetch(constants.signUpURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(userSingUp)
	});
	let result = await response.json();
	if (response.ok) {
		DOM.signInRadio.click()
	}else{
		DOM.messageSignUp.innerHTML = result.message
	}
}

async function postSingIn() {
	let response = await fetch(constants.signInURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(userSingIn)
	});
	let result = await response.json();
	if (response.ok) {
		localStorage.setItem('token', result['token'])
		isAuthorised()
		DOM.messageSignIn.innerHTML = result.message
	}else {
		DOM.messageSignIn.innerHTML = result.message
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
	if (!(localStorage.getItem('token') === 'undefined') && !(localStorage.getItem('token') === null))
	{
		hideForm(DOM.modalIcon);
		showForm(DOM.mainArea);
		showForm(DOM.searchImg);
		DOM.headerInput.disabled = !DOM.headerInput.disabled;
		changeImg('/img/signOut.png', DOM.loginImg);
		renderCards();
	}
}