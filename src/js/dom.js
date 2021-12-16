export const DOM = {
    preview: document.querySelector('.preview'),
    loginForm: document.querySelector('.container-login'),
    loginImg: document.querySelector('.login__img'),
    searchImg: document.querySelector('.search__img'),
    headerInput: document.querySelector('.header-input'),

    singInLogin: document.querySelector('#signin-form input[data="login"]'),
    singInPassword: document.querySelector('#signin-form input[data="password"]'),
    singInButton: document.querySelector('#signin-form button'),
    singInInputs: document.querySelectorAll('.inputs-signin'),
    errorsMessagesSingIn: document.querySelectorAll('.error-signin'),

    singUpFirstName: document.querySelector('#singup-form input[data="first-name"]'),
    singUpLastName: document.querySelector('#singup-form input[data="last-name"]'),
    singUpLogin: document.querySelector('#singup-form input[data="login"]'),
    singUpPassword: document.querySelector('#singup-form input[data="password"]'),
    singUpButton: document.querySelector('#singup-form button'),
    singUpInputs: document.querySelectorAll('.inputs-signup'),
    errorsMessagesSingUp: document.querySelectorAll('.error-signup'),

    modalIcon: document.querySelector('.modal-icon'),
    mainArea: document.querySelector('.main-area'),

    filmsArea: document.querySelector('.main-area__films-area'),
    filterButton: document.querySelector('.main-area__filter-img'),
    filtersForm: document.querySelector('.filters-form'),
    templateCard: document.querySelector('#template-card').innerHTML,
    statusSelect: document.querySelector('.label-select'),
    resetButton: document.querySelector('.reset-button'),

    pagination: document.querySelector('.main-area__pagination'),

    checkAdult: document.querySelector('#adult'),
    checkPaidOff: document.querySelector('#paid-off'),
    checkReleased: document.querySelector('#status-select'),
    countrySelect: document.querySelector('#country-select'),
    genresSelect: document.querySelector('#genres-select'),
    bigButton: document.querySelector('.go-button')
}