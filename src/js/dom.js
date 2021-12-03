export const DOM = {
    singInLogin: document.querySelector('#singin input[data="login"]'),
    singInPassword: document.querySelector('#singin input[data="password"]'),
    singInButton: document.querySelector('#singin button'),
    singUpFirstName: document.querySelector('#singup input[data="first_name"]'),
    singUpLastName: document.querySelector('#singup input[data="last_name"]'),
    singUpLogin: document.querySelector('#singup input[data="login"]'),
    singUpPassword: document.querySelector('#singup input[data="password"]'),
    singUpButton: document.querySelector('#singup button'),
    loginForm: document.querySelector('.container-login'),
    singInInputs: document.querySelectorAll('.inputsSingIn'),
    singUpInputs: document.querySelectorAll('.inputsSingUp'),
    errorsMessagesSingUp: document.querySelectorAll('.error'),
    errorsMessagesSingIn: document.querySelectorAll('.errorSingIn'),
    filmsArea: document.querySelector('.filmsArea'),
    modalIcon: document.querySelector('.modalIcon'),
    templateCard: document.querySelector('#templateCard').innerHTML
}