import { DOM } from "./dom"
const url = 'https://wowmeup.pp.ua/user/sing_up';
const regexp = /^[A-Za-z]+$/
let userSingUp= {
    first_name: null,
    last_name: null,
    login: null,
    password: null
}
let userSingIn={
        login: null,
        password: null
}


export function hideForm() {
    loginForm.classList.add('none');
}
export function singIn(e) {
    e.preventDefault();
    validation(DOM.singInInputs, DOM.errorsMessagesSingIn)
    if (isValid(DOM.errorsMessagesSingIn)){
        setuserbodyforrequest(userSingIn)
        postSingIn()
    }

}
export function singUp(e) {
    e.preventDefault();
    validation(DOM.singUpInputs, DOM.errorsMessagesSingUp)
    if (isValid(DOM.errorsMessagesSingUp)) {
        setuserbodyforrequest(userSingUp)
        postSingUp()
    }
}




export function validation(element, errorsection)
{
    for (let i=0; i<element.length-1; i++) {
        if (element[i].value.length < 3) {
        errorfunc('This field must contains at least 3 letters!', i, errorsection)
        }else {
            if (regexp.test(element[i].value) === false) {
                errorfunc('This field must contains only letters!', i, errorsection)
            }
            else{
                errorfunc('This field is OK!', i, errorsection)
            }
        }
    }
    if (element[element.length-1].value.length < 6) {
        errorfunc('This field must contains at least 8 symbols!', element.length-1, errorsection)
    }
    else{
        errorfunc('This field is OK!',element.length-1, errorsection)
    }
}

function isValid(element)
{
    let countofvalidinputs = 0;
    for (let i=0; i<element.length; i++) {
        if (element[i].innerText === 'This field is OK!') {
            countofvalidinputs++
        }
    }
    if (countofvalidinputs === element.length){
        return true
    }
}

export function errorfunc(textoferror, position, errorsection)
{
    let error = errorsection
        error[position].innerHTML = textoferror
}

export async function postSingUp () {
    let response = await fetch('https://wowmeup.pp.ua/user/sing_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userSingUp)
    });
    let result = await response.json();
    alert(result);
}

export async function postSingIn (){
    let response = await fetch('https://wowmeup.pp.ua/user/sign_in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userSingIn)
    });
    let result = await response.json();
    localStorage.setItem('token',result['token'])
    if (localStorage.getItem('token')==='undefined')
    {
        alert('Что-то пошло не так :(')
    }
}


export function setuserbodyforrequest(obj)
{
    if(obj===userSingUp) {
        userSingUp.first_name = DOM.singUpFirstName.value
        userSingUp.last_name = DOM.singUpLastName.value
        userSingUp.login = DOM.singUpLogin.value
        userSingUp.password = DOM.singUpPassword.value
    }
    if(obj===userSingIn){
        userSingIn.login = DOM.singInLogin.value
        userSingIn.password = DOM.singInPassword.value
    }
}

