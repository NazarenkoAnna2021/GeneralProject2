import "/css/style.css"
import {DOM} from "./dom.js"

DOM.singInButton.addEventListener('click', singIn);
DOM.singUpButton.addEventListener('click', singUp);

function hideForm() {
    loginForm.classList.add('none');
}
function singIn(e) {
    e.preventDefault();
    console.log('test');
}
function singUp(e) {
    e.preventDefault();
}