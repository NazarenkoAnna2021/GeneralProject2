import { DOM } from "./dom"
import {renderStartCards} from "./gallery"
import "./img"
import { hideForm, showForm, changeImg } from "./visibility"

const url = 'https://wowmeup.pp.ua/user/sing_up';//Это константа!!!

const regexp = /^[A-Z][a-z]+$/;
const regexplogin = /^[a-zA-Z][a-zA-Z0-9]+$/

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

export function singIn(e) {
	e.preventDefault();
	validation(DOM.singInInputs, DOM.errorsMessagesSingIn)
	if (isValid(DOM.errorsMessagesSingIn)) {
		setUserBodyForFequest(userSingIn)
		postSingIn()
		renderCards();
	}
}

export function singUp(e) {
	e.preventDefault();
	validation(DOM.singUpInputs, DOM.errorsMessagesSingUp)
	if (isValid(DOM.errorsMessagesSingUp)) {
		setUserBodyForFequest(userSingUp)
		postSingUp()
	}
}

function validation(element, errorsection) {
	for (let i = 0; i < element.length - 2; i++) {//Использовать forEach
		if (element[i].value.length < 3) errorfunc('This field must contains at least 3 letters!', i, errorsection)
		else {
			if (regexp.test(element[i].value) === false) {
				errorfunc('This field must contains only letters, and first must be title!', i, errorsection)
			} else {
				errorfunc('This field is OK!', i, errorsection)
			}// тут нужна тернарка
		}
	}

	if (element[element.length - 2].value.length < 3) {
		errorfunc('This field must contains at least 3 letters or numbers!', element.length - 2, errorsection)
	} else {
		if (regexplogin.test(element[element.length - 2].value) === false) {
			errorfunc('This field must starts with letter!', element.length - 2, errorsection)
		} else {
			errorfunc('This field is OK!', element.length - 2, errorsection)
		}

	}
	if (element[element.length - 1].value.length < 8) {
		errorfunc('This field must contains at least 8 symbols and 1 number!', element.length - 1, errorsection)
	} else {
		errorfunc('This field is OK!', element.length - 1, errorsection)
	}
}

function isValid(element) {
	let countofvalidinputs = 0;
	for (let i = 0; i < element.length; i++) {//Использовать forEach
		if (element[i].innerText === 'This field is OK!') {
			countofvalidinputs++
		}
	}
	if (countofvalidinputs === element.length) {
		return true
	}
}

function errorfunc(textoferror, position, errorsection) {
	let error = errorsection
	error[position].innerHTML = textoferror
}

async function postSingUp() {
	let response = await fetch('https://wowmeup.pp.ua/user/sing_up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(userSingUp)
	});
	let result = await response.json();
	if (response.ok) {


	} else {
		alert(result.message)
	}
}

async function postSingIn() {
	let response = await fetch('https://wowmeup.pp.ua/user/sign_in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(userSingIn)
	});
	let result = await response.json();
	if (response.ok) {
		localStorage.setItem('token', result['token'])
		hideForm(DOM.modalIcon);
		showForm(DOM.mainArea);
		showForm(DOM.searchImg);
		DOM.headerInput.disabled = !DOM.headerInput.disabled;
		changeImg('/img/signOut.png', DOM.loginImg);
	} else {
		alert(result.message)
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